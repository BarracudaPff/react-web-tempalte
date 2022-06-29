import re
from pathlib import Path

root = Path("/Users/Kirill.Krylov/WebstormProjects/premiertips-front-react/src")

path_to_source = Path("/Users/Kirill.Krylov/WebstormProjects/premiertips-front-react/src/assets/img")
path_to_file = Path("/Users/Kirill.Krylov/WebstormProjects/premiertips-front-react/src/components/icons.ts")

setOfSplitChar = re.compile("[_\\-/]")

OKGREEN = "\033[92m"
FAIL = "\033[91m"
ENDC = "\033[0m"


def resolve_to(_root, path):
    return Path(*path.parts[len(_root.parts) - 1:])


def to_camel_case(snake_str):
    components = setOfSplitChar.split(snake_str)
    # We capitalize the first letter of each component except the first one
    # with the 'title' method and join them together.
    return components[0].title() + ''.join(x.title() for x in components[1:])


paths = [
    "src/assets/img/icons/ui/elm",
    "src/assets/img/icons/ui/icn",
    "src/assets/img/icons/ui",
    "src/assets/img/landing",
    "src/assets/img/icons/landing",
]


def remove_prefix(val, prefix):
    return val[len(prefix):] if val.startswith(prefix) else val


def remove_suffix(val, suffix):
    return val[:-len(suffix)] if val.endswith(suffix) else val


def file_to_export(path: Path):
    try:
        _import_path = resolve_to(root, path)
        import_path = str(_import_path)
        for key in paths:
            if import_path.startswith(key):
                import_path = import_path[len(key) + 1:]
        import_path = remove_suffix(import_path, ".svg")
        name = to_camel_case(import_path)
        print(f"{OKGREEN}Processed file {path}{ENDC}")
        return f'export {{default as {name}}} from "{str(_import_path)}"'
    except:
        print(f"{FAIL}Processed file {path}{ENDC}")
        return f'ERROR'


if __name__ == '__main__':
    result = list(path_to_source.rglob("*.svg"))
    result = [file_to_export(it) for it in result]
    result.sort()
    result = "// noinspection JSUnusedGlobalSymbols\n\n" + "\n".join(result) + "\n"

    # print(result)
    with open(path_to_file, "w") as f:
        f.write(result)

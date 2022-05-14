import re
from pathlib import Path

root = Path("/Users/Kirill.Krylov/WebstormProjects/premiertips-front-react/src")

path_to_source = Path("/Users/Kirill.Krylov/WebstormProjects/premiertips-front-react/src/assets/img")
path_to_file = Path("/Users/Kirill.Krylov/WebstormProjects/premiertips-front-react/src/components/icons.ts")

setOfSplitChar = re.compile("[_-]")

OKGREEN = "\033[92m"
ENDC = "\033[0m"


def to_camel_case(snake_str):
    components = setOfSplitChar.split(snake_str)
    # We capitalize the first letter of each component except the first one
    # with the 'title' method and join them together.
    return components[0].title() + ''.join(x.title() for x in components[1:])


def file_to_export(path: Path):
    import_path = Path(*path.parts[len(root.parts) - 1:])
    name = to_camel_case(str(import_path.stem))
    print(f"{OKGREEN}Processed file {path}{ENDC}")
    return f'export {{default as {name}}} from "{str(import_path)}"'


if __name__ == '__main__':
    result = list(path_to_source.rglob("*.svg"))
    result = [file_to_export(it) for it in result]
    result.sort()
    result = "// noinspection JSUnusedGlobalSymbols\n\n" + "\n".join(result) + "\n"

    with open(path_to_file, "w") as f:
        f.write(result)

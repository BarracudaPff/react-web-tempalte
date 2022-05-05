import {useContext} from "react";
import {UNSAFE_NavigationContext, useSearchParams} from "react-router-dom";
import {NumberParam, QueryParamConfig, StringParam, withDefault} from "serialize-query-params";

type NewValueType<D> = D | ((latestValue: D) => D);
type UrlUpdateType = "replace" | "push" | undefined;
type UseSearchParam<D, D2 = D> = [D2, (newValue: NewValueType<D>, updateType?: UrlUpdateType) => void];

export default function <D, D2 = D>(
    name: string,
    config: QueryParamConfig<D, D2> = StringParam as QueryParamConfig<any>,
): UseSearchParam<D, D2> {
    const [searchParams, setSearchParams] = useSearchParams();
    const { navigator } = useContext(UNSAFE_NavigationContext);

    const setNewValue = (valueOrFn: NewValueType<D>, updateType?: UrlUpdateType): void => {
        let newValue;
        const value = searchParams.get(name);
        if (typeof valueOrFn === "function") {
            newValue = (valueOrFn as Function)(config.decode(value));
        } else {
            newValue = valueOrFn;
        }
        const encodedValue = config.encode(newValue);

        const params = new URLSearchParams((navigator as any).location.search);

        if (typeof encodedValue === "string") {
            params.set(name, encodedValue);
        } else {
            params.delete(name);
        }
        setSearchParams(params, { replace: updateType === "replace" });
    };

    const decodedValue = config.decode(searchParams.get(name));
    return [decodedValue, setNewValue];
}

export const PageNumberParam = withDefault(NumberParam, 1);

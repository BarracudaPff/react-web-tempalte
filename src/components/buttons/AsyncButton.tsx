import React, {FC, useState} from "react";
import {Button} from "antd";
import {ButtonProps} from "antd/lib/button";

// https://gist.github.com/vimcaw/32745d0ac1342fbcb53bc453be3e36cd
function isPromise(value: unknown): value is Promise<unknown> {
    // ref: https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise

    return (
        typeof value === "object" &&
        value !== null &&
        "then" in value &&
        typeof (value as { then: unknown }).then === "function"
    );
}

const AsyncButton: FC<ButtonProps> = ({ onClick, loading: primitiveLoading, ...restProps }) => {
    const [isHandlingClick, setHandlingClick] = useState<boolean>(false);

    return (
        <Button
            {...restProps}
            loading={primitiveLoading === undefined ? isHandlingClick : primitiveLoading}
            onClick={async (...args) => {
                if (typeof onClick === "function" && !isHandlingClick) {
                    const returnValue = onClick(...args) as unknown;

                    if (isPromise(returnValue)) {
                        // If "onClick" function return a Promise
                        // According to the status of Promise, switch loading automatically.
                        try {
                            setHandlingClick(true);
                            await returnValue;
                            setHandlingClick(false);
                        } catch (e) {
                            setHandlingClick(false);
                            throw e;
                        }
                    }
                }
            }}
        />
    );
}

export default AsyncButton

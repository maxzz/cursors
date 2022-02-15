import React, { ChangeEvent, HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { cursorSizeAtom } from "../store/store";
import { classNames } from "../utils/classnames";

function SizeSelectorSlider() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="">
            <label className="h-6 text-sm flex items-center space-x-2">
                <div className="">Size</div>
                <input type="range" value={size} onChange={(event) => setSize(+event.target.value)} />
                <div className="">
                    <input className="w-10 text-center" type="text" value={size} onChange={(event) => setSize(+event.target.value)} />
                </div>
            </label>
        </div>
    );
}

const CURSOR_SIZES = [16, 32, 64, 128, 256];

function CursorSizeSelectorButtons() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="flex items-center space-x-2">
            {CURSOR_SIZES.map((item, idx) => (
                <label key={item} className="text-xs flex items-center space-x-1">
                    <input className="form-radio" type="radio" value={item} checked={size === item} onChange={onChange} />
                    <div className="">{item}</div>
                </label>
            ))}
        </div>
    );
}

export function CursorSizeSelector({ className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("flex flex-col space-y-4", className)}>
            <CursorSizeSelectorButtons />
            <SizeSelectorSlider />
            <br />
            <CursorSizeSelectorButtons2 />
        </div>
    );
}

const CURSOR_SIZES2 = [16, 32, 64, 128, 256, -1];

function CursorSizeSelectorButtons2() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="flex items-center">
            {CURSOR_SIZES2.map((item, idx) => (
                // <label key={item} className="px-2 py-2 text-xs flex items-center space-x-1 border-t border-b border-r border-red-500 first:border-l">
                <label className="px-2 py-2 text-xs flex items-center space-x-1 border-red-500 border border-l-0 first:border-l first:rounded-l-full last:rounded-r-full" key={item}>
                    {idx !== CURSOR_SIZES2.length - 1
                        ? <>
                            <input className="form-radio" type="radio" value={item} checked={size === item} onChange={onChange} />
                            <div className="">{item}</div>
                        </>
                        : <>
                            <div className="">
                                <input className="w-10 text-center" type="text" value={size} onChange={(event) => setSize(+event.target.value)} />
                            </div>
                        </>
                    }
                </label>
            ))}
        </div>
    );
}

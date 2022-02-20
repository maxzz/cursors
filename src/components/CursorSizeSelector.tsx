import React, { ChangeEvent, HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { cursorSizeAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { a, useSpring } from '@react-spring/web';
import { cleanupValueUInt, useNumberInput } from "../hooks/useNumberInput";

/**/
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
/**/

export function CursorSizeSelector({ className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="h-32 flex flex-col justify-between">
            <div className={classNames("flex flex-col space-y-4", className)}>
                <CursorSizeSelectorButtons />
                <SizeSelectorSlider />
            </div>
            {/* <CursorSizeSelectorButtons2 /> */}
            <CursorSizeSelectorButtons1 />
        </div>
    );
}

/**/
//const CURSOR_SIZES2 = [16, 32, 128, 256];

export function CursorSizeSelectorButtons1() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        let size = +event.target.value;
        if (size !== -1) {
            setSize(size);
        }
    }
    return (
        <div className="flex items-center">
            {CURSOR_SIZES2.map((item, idx) => (
                <label className="w-14 last:w-min px-2 py-3 text-xs flex items-center justify-center space-x-1 border-sky-900 border border-l-0 first:border-l first:rounded-l-full last:rounded-r-full" key={item}>
                    <input className="form-radio" type="radio" value={item} checked={size === item} onChange={onChange} />
                    <div className="">{item}</div>
                </label>
            ))}
            <label className="relative w-14 last:w-min text-xs flex items-center justify-center border-sky-900 border border-l-0 first:border-l first:rounded-l-full last:rounded-r-full" key={-1}>
                <div className="">
                    <input className="w-16 pl-2 py-3 text-center rounded-r-full" type="text" value={size} onChange={(event) => setSize(+event.target.value)} />
                </div>
                <input className="absolute left-2 form-radio" type="radio" value={-1} checked={size === -1} onChange={onChange} />
            </label>
        </div>
    );
}
/**/

const CURSOR_SIZES2 = [16, 32, 128, 256];

export function CursorSizeSelectorButtons2() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    const bind = useNumberInput(size, setSize, cleanupValueUInt);  //TODO: check range > 0 && range <= 256
    const [open, setOpen] = React.useState(false);
    const styles = useSpring({ open: open ? 1 : 0, config: { mass: 0.2, tension: 492, clamp: true } });
    return (
        <div className="relative inline-block text-xs">
            <label className={classNames("w-16 flex items-center bg-slate-300 border-slate-500 border overflow-hidden focus-within:ring", open ? 'rounded-t-md' : 'rounded-md')}>
                <div className="w-10">
                    <input className="w-full px-2 py-1 bg-transparent border-slate-500 border-r focus:outline-none" type="text" {...bind} />
                </div>
                <button className="focus:outline-none focus:bg-slate-400" onClick={() => setOpen(v => !v)}>
                    {/* Open/Close icon */}
                    <svg className="w-6 h-6 p-1 stroke-current stroke-[.6rem] fill-transparent" viewBox="0 0 100 100">
                        <a.path d={styles.open.to({ range: [0, 1], output: ["M 15 34 L 45 65 L 78 34", "M 15 53 L 45 23 L 78 53"] })} />
                    </svg>
                </button>
            </label>
            {open &&
                <div className="absolute top-full w-16 bg-slate-300 border-slate-500 border rounded-b-md">
                    {CURSOR_SIZES2.map((itemSize) => (
                        <div
                            className={`w-full px-2 py-1 hover:bg-slate-400 ${itemSize === size ? 'font-bold' : ''} cursor-pointer`}
                            key={itemSize}
                            onClick={() => { setSize(itemSize); setOpen(false); }}
                        >
                            {itemSize}
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

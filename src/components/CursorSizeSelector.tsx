import React, { ChangeEvent, HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { cursorSizeAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { a, useSpring } from '@react-spring/web';
import { cleanupValueUInt, useNumberInput } from "../hooks/useNumberInput";

const CURSOR_SIZES2 = [16, 32, 128, 256];

export function CursorSizeSelector() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    const bind = useNumberInput(size, setSize, cleanupValueUInt);  //TODO: check range > 0 && range <= 256
    const [open, setOpen] = React.useState(false);
    const styles = useSpring({ open: open ? 1 : 0, config: { mass: 0.2, tension: 492, clamp: true } });
    return (
        <div className="relative inline-block text-xs">
            <label className={classNames(
                "w-16 flex items-center bg-slate-400 border-slate-500 border overflow-hidden focus-within:ring shadow",
                open ? 'rounded-t-md' : 'rounded-md'
            )}>
                <div className="w-10">
                    <input className="w-full px-2 py-1 bg-slate-300 border-slate-500 border-r focus:outline-none" type="text" {...bind} />
                </div>
                {/* <button className="focus:outline-none focus:bg-slate-400" onClick={() => setOpen(v => !v)}> */}
                <button className="focus:outline-none bg-slate-300 focus:bg-slate-400" onClick={() => setOpen(v => !v)}>
                    {/* Open/Close icon */}
                    <svg className="w-6 h-6 p-1 stroke-current stroke-[.6rem] fill-transparent" viewBox="0 0 100 100">
                        <a.path d={styles.open.to({ range: [0, 1], output: ["M 15 34 L 45 65 L 78 34", "M 15 53 L 45 23 L 78 53"] })} />
                    </svg>
                </button>
            </label>
            {open &&
                <div className="absolute top-full w-16 bg-slate-300 border-slate-500 border border-t-0 rounded-b-md">
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

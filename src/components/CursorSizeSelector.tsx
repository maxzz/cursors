import React, { Children, HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { cursorSizeAtom, showGrayAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { a, useSpring, useTransition } from '@react-spring/web';
import { cleanupValueUInt, useNumberInput } from "../hooks/useNumberInput";

const CURSOR_SIZES2 = [16, 32, 128, 256];

function DropDown({ size, setSize, setOpen }: { size: number, setSize: (v: number) => void, setOpen: (v: boolean) => void; }) {
    return (
        <div className="absolute top-full w-16 bg-slate-400 border-slate-500 border border-t-0 rounded-b-md overflow-hidden">
            {CURSOR_SIZES2.map((itemSize) => (
                <div
                    className={`w-full px-2 py-1 bg-slate-300 hover:bg-slate-400 ${itemSize === size ? 'font-bold' : ''} cursor-pointer`}
                    key={itemSize}
                    onClick={() => { setSize(itemSize); setOpen(false); }}
                >
                    {itemSize}
                </div>
            ))}
        </div>
    );
}

const animationScaleY = {
    from: { opacity: 0, transform: 'scaleY(0.1)' },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, transform: 'scaleY(0.1)' },
};

const animationConfig = {
    config: { mass: 0.2, tension: 692, clamp: true },
};

function ListTransition({ open, children }: { open: boolean; children: React.ReactNode; }) {
    const transition = useTransition(open, { ...animationScaleY, ...animationConfig });
    return transition((styles, item) => (
        item && <a.div style={styles}>
            {children}
        </a.div>
    ));
}

function IconUpdown({ open }: { open: boolean; }) {
    const styles = useSpring({ open: open ? 1 : 0, config: { mass: 0.2, tension: 492, clamp: true } });
    return (
        <svg className="w-6 h-6 p-1 stroke-current stroke-[.6rem] fill-transparent" viewBox="0 0 100 100">
            <a.path d={styles.open.to({ range: [0, 1], output: ["M 15 34 L 45 65 L 78 34", "M 15 53 L 45 23 L 78 53"] })} />
        </svg>
    );
}

export function CursorSizeSelector() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    const bind = useNumberInput(size, setSize, cleanupValueUInt);  //TODO: check range > 0 && range <= 256
    const [open, setOpen] = React.useState(false);
    return (
        <div className="relative inline-block text-xs">

            {/* Input and button */}
            <label className={
                classNames(
                    "w-16 flex items-center bg-slate-400 border-slate-500 border overflow-hidden focus-within:ring shadow-md",
                    open ? 'rounded-t-md' : 'rounded-md'
                )}
            >
                <div className="w-10">
                    <input className="w-full px-2 py-1 text-center bg-slate-300 border-slate-500 border-r focus:outline-none" type="text" {...bind} />
                </div>

                {/* Open/Close icon */}
                <button className="focus:outline-none bg-slate-300 focus:bg-slate-400" onClick={() => setOpen(v => !v)}>
                    <IconUpdown open={open} />
                </button>
            </label>

            {/* List */}
            <ListTransition open={open}>
                <DropDown size={size} setSize={setSize} setOpen={setOpen} />
            </ListTransition>
        </div>
    );
}

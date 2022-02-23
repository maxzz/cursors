import React from "react";
import { useAtom } from "jotai";
import { cursorSizeAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { cleanupValueUInt, useNumberInput } from "../hooks/useNumberInput";
import { UIListTransition } from "./UI/UIListTransition";
import { UIIconUpDown } from "./UI/UIIconUpDown";
import { useClickAway, useKey } from "react-use";

const CURSOR_SIZES2 = [16, 32, 128, 256];

function DropDownList({ size, setSize, setOpen }: { size: number, setSize: (v: number) => void, setOpen: (v: boolean) => void; }) {
    const containerRef = React.useRef<HTMLUListElement>(null);
    function handleKey(event: KeyboardEvent) {
        console.log('k');
    }
    useKey((event) => {
        console.log('ee', event);
        
        return event.key === 'ArrowUp'
    }, handleKey, { target: containerRef.current });
    console.log('ini', containerRef.current);
    
    return (
        <ul className="absolute top-full w-16 bg-slate-400 border-slate-500 border border-t-0 rounded-b-md overflow-hidden" ref={containerRef} tabIndex={0}
        // onKeyUpCapture={(event) => {
        //     console.log('ee inline', event);
        // }}
        >
            {CURSOR_SIZES2.map((itemSize) => (
                <li
                    className={`w-full px-2 py-1 bg-slate-300 hover:bg-slate-400 ${itemSize === size ? 'font-bold' : ''} cursor-pointer`}
                    key={itemSize}
                    onClick={() => { setSize(itemSize); setOpen(false); }}
                >
                    {itemSize}
                </li>
            ))}
        </ul>
    );
}

export function CursorSizeSelector() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    const bind = useNumberInput(size, setSize, cleanupValueUInt);  //TODO: check range > 0 && range <= 256
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    useClickAway(containerRef, () => setOpen(false));
    return (
        <div className="relative inline-block text-xs" ref={containerRef}>

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
                    <UIIconUpDown open={open} />
                </button>
            </label>

            {/* List */}
            <UIListTransition open={open}>
                <DropDownList size={size} setSize={setSize} setOpen={setOpen} />
            </UIListTransition>
        </div>
    );
}

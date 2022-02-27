import React from "react";
import { useAtom } from "jotai";
import { cursorSizeAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { cleanupValueUInt, useNumberInput } from "../hooks/useNumberInput";
import { UIListTransition } from "./UI/UIListTransition";
import { UIIconUpDown } from "./UI/UIIconUpDown";
import { useClickAway } from "react-use";

const CURSOR_SIZES2 = [16, 32, 128, 256];

function DropDownList({ size, setSize, setOpen }: { size: number, setSize: (v: number) => void, setOpen: (v: boolean) => void; }, ref: React.Ref<HTMLUListElement>) {
    function handleKey(event: React.KeyboardEvent<HTMLUListElement>) {
        //event.preventDefault();
        const k = event.key;

        console.log('-----List:onKeyDown key', k, event, document.activeElement);

        if (k === 'ArrowUp' || k === 'ArrowDown') {
            let idx = CURSOR_SIZES2.findIndex((item) => item === size);
            idx = idx !== -1 ? idx + (k === 'ArrowUp' ? -1 + CURSOR_SIZES2.length : 1) : 0;
            setSize(CURSOR_SIZES2[idx % CURSOR_SIZES2.length]);
        }
        else if (k === 'Enter' || k === 'Escape' || k === 'Space') {
            setOpen(false);
        }
    }
    return (
        <ul className="absolute top-full w-16 bg-slate-400 border-slate-500 border border-t-0 rounded-b-md overflow-hidden focus:outline-none focus-within:ring"
            ref={ref}
            tabIndex={0}
            onKeyDown={handleKey}
            onKeyPress={(event) => {
                console.log('-----List:onKeyPress', event, document.activeElement);
            }}
        >
            {CURSOR_SIZES2.map((itemSize) => (
                <li
                    className={`w-full px-2 py-1 bg-slate-300 hover:bg-black/[.01] ${itemSize === size ? 'font-bold' : ''} cursor-pointer`}
                    onClick={() => { setSize(itemSize); setOpen(false); }}
                    key={itemSize}
                >
                    {itemSize}
                </li>
            ))}
        </ul>
    );
}

const DropDownListRef = React.forwardRef(DropDownList);

export function CursorSizeSelector() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    const bind = useNumberInput(size, setSize, cleanupValueUInt);  //TODO: check range > 0 && range <= 256
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLUListElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    useClickAway(containerRef, () => setOpen(false));
    React.useEffect(() => {
        console.log('useEffect:open', open, 'dropdownRef.current', dropdownRef.current);
        if (open) {
            dropdownRef.current?.focus();
        }
    }, [open]);
    function setOpenWFocus(v: boolean) {
        console.log('setOpenWFocus ref', (v ? dropdownRef : buttonRef).current);

        if (v) {
            dropdownRef.current?.focus();
        } else {
            buttonRef.current?.focus();
        }
        setOpen(v);
    }
    return (
        <div className="relative inline-block text-xs" ref={containerRef}>

            {/* Input and dropdown list Open/Close button */}
            <label className={
                classNames(
                    "w-16 flex items-center bg-slate-400 border-slate-500 border overflow-hidden focus-within:ring shadow-md",
                    open ? 'rounded-t-md' : 'rounded-md'
                )}
            >
                {/* Input */}
                <div className="w-10">
                    <input className="w-full px-2 py-1 text-center bg-slate-300 border-slate-500 border-r focus:outline-none" type="text" {...bind} />
                </div>

                {/* Button */}
                <button
                    className="focus:outline-none bg-slate-300 focus:bg-slate-400"
                    ref={buttonRef}

                    onClick={(event) => {
                        console.log('button:onClick', event);
                        setOpenWFocus(!open);
                    }}
                    /*
                    onKeyDown={(event) => {
                        console.log('button:onKeyDown', event);

                        // event.preventDefault();
                        // event.stopPropagation();

                        const k = event.key;
                        if (k === 'Enter' || k === 'Space') {
                            setOpenWFocus(!open);
                        }
                        //setOpen(v => !v);
                    }}
                    */

                // onKeyDown={(event) => {
                //     console.log('button:onKeyDown', event);
                // }}
                // onKeyUp={(event) => {
                //     console.log('button:onKeyUp', event);
                // }}
                >
                    <UIIconUpDown open={open} />
                </button>
            </label>

            {/* List */}
            <UIListTransition open={open}>
                <DropDownListRef size={size} setSize={setSize} setOpen={setOpenWFocus} ref={dropdownRef} />
                {/* <DropDownListRef size={size} setSize={setSize} setOpen={setOpen} ref={dropdownRef} /> */}
            </UIListTransition>

            {/* <button
                className="m-2 px-2 py-1 border-sky-900 border rounded"
                onKeyDown={(event) => {
                    console.log('---------------------');
                    console.log('test.button:onKeyDown', event);
                }}
                onKeyUp={(event) => {
                    console.log('test.button:onKeyUp', event);
                }}
                onKeyPress={(event) => {
                    console.log('test.button:onKeyPress', event);
                }}
                onClick={(event) => {
                    console.log('test.button:onClick', event);
                }}
            >test</button> */}
        </div>
    );
}

/*
    // React.useEffect(() => {
    //     console.log('useEffect:open', open, 'dropdownRef.current', dropdownRef.current);
    //     if (open) {
    //         dropdownRef.current?.focus();
    //     }
    // }, [open]);
    function setOpenWFocus(v: boolean) {
        (v ? dropdownRef : buttonRef).current?.focus();
        setOpen(v);
    }
*/
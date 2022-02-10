import { useRef, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";

export function DropContainer({ onDropped, accept, children, activeAtom, ...rest }: { // accept = '.png'
    onDropped: (files: FileList) => {};
    accept?: string;
    activeAtom: PrimitiveAtom<boolean>;
} & React.HTMLAttributes<HTMLLabelElement>
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropActive, setDropActive] = useAtom(activeAtom);
    return (
        <label
            className={`w-full h-full inline-block border-slate-500 border rounded ${dropActive ? 'bg-pink-400' : 'bg-slate-400'} cursor-pointer`}
            {...rest}
            onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                !dropActive && setDropActive(true);
            }}
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDropActive(false);
                onDropped(event.dataTransfer.files);
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={() => inputRef.current?.files && onDropped(inputRef.current?.files)}
            />
            {children}
        </label>
    );
}

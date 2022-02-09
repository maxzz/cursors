import { useRef, useState } from "react";

export function DropContainer({ onDropped, accept, ...rest }: { onDropped: (files: FileList) => {}; accept?: string; } & React.HTMLAttributes<HTMLLabelElement>) { // accept = '.png'
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropActive, setDropActive] = useState(false);
    return (
        <label
            className={`w-32 h-16 inline-block border-slate-500 border rounded ${dropActive ? 'bg-pink-400' : 'bg-slate-400'}`}
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
        </label>
    );
}

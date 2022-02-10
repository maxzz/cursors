import { useRef } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { classNames } from "../../utils/classnames";

export function UIDropContainer({ onDropped, accept, className, children, activeAtom, ...rest }: {
    onDropped: (files: FileList) => {};
    accept?: string; // accept = '.png'
    activeAtom: PrimitiveAtom<boolean>;
} & React.HTMLAttributes<HTMLLabelElement>
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropActive, setDropActive] = useAtom(activeAtom);
    return (
        <label
            className={classNames(`inline-block`, className)}
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
            onDragEnter={(event) => setDropActive(true)}
            onDragLeave={(event) => setDropActive(false)}
            {...rest}
        >
            <input
                type="file"
                className="hidden"
                accept={accept}
                onChange={() => inputRef.current?.files && onDropped(inputRef.current?.files)}
                ref={inputRef}
            />
            {children}
        </label>
    );
}

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { atom, PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { classNames } from "@/utils/classnames";
import { useUpdateAtom } from "jotai/utils";
import { orgImgAtom } from "@/store/store";
import { toastWarning } from "./UiToaster";
import { IconImagePlus } from "./UIIcons";
import { createImageFromBlob, loadFileData } from "@/utils/image-utils";

type UIDropContainerProps = {
    onDropped: (files: FileList) => void;
    accept?: string; // accept = '.png'
    activeAtom: PrimitiveAtom<boolean>;
};

function DragHandlers({ onDropped, activeAtom }: UIDropContainerProps) {
    const [dropActive, setDropActive] = useAtom(activeAtom);
    useEffect(() => {
        function _onDragEnter(event: DragEvent) {
            setDropActive(true);
        }
        function _onDragOver(event: DragEvent) {
            event.preventDefault();
            event.stopPropagation();
            !dropActive && setDropActive(true);
        }
        function _onDragLeave(event: DragEvent) {
            setDropActive(false);
        }
        function _onDrop(event: DragEvent) {
            event.preventDefault();
            event.stopPropagation();
            setDropActive(false);
            event.dataTransfer && onDropped(event.dataTransfer.files);
        }

        document.addEventListener('dragenter', _onDragEnter);
        document.addEventListener('dragover', _onDragOver);
        document.addEventListener('dragleave', _onDragLeave);
        document.addEventListener('drop', _onDrop);

        return () => {
            document.removeEventListener('dragenter', _onDragEnter);
            document.removeEventListener('dragover', _onDragOver);
            document.removeEventListener('dragleave', _onDragLeave);
            document.removeEventListener('drop', _onDrop);
        };
    }, []);
    return (<></>);
}

export function DropZone3() {
    const setOrgImg = useUpdateAtom(orgImgAtom);
    const [activeAtom] = useState(atom(false));
    const active = useAtomValue(activeAtom);

    async function handleDrop(files: FileList) {
        if (!files.length) { return; }
        try {
            const blob = await loadFileData(files[0]);
            const img: HTMLImageElement = await createImageFromBlob(blob);
            setOrgImg(img);
        } catch (error) {
            setOrgImg(null);
            toastWarning((error as Error)?.message || 'Failed to load image');
        }
    }

    console.log('active', active);

    return (<>
        <DragHandlers onDropped={handleDrop} activeAtom={activeAtom} />

        {active && <div className={`absolute left-4 top-0.5 pb-0.5 text-xs ${active ? 'text-slate-50 font-bold' : 'text-slate-100'}`}>
            'Drop it!'
        </div>}
    </>);
}


export function UIDropContainer({ onDropped, accept, className, children, activeAtom, ...rest }: UIDropContainerProps & HTMLAttributes<HTMLLabelElement>) {
    const [dropActive, setDropActive] = useAtom(activeAtom);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <label
            className={classNames(`absolute inset-0`, className)}

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
                ref={inputRef}
                type="file"
                className="hidden"
                accept={accept}
                onChange={() => inputRef.current?.files && onDropped(inputRef.current?.files)}
            />
            {children}
        </label>
    );
}

export function DropZone2() {
    const setOrgImg = useUpdateAtom(orgImgAtom);
    const [activeAtom] = useState(atom(false));
    const active = useAtomValue(activeAtom);

    async function handleDrop(files: FileList) {
        if (!files.length) { return; }
        try {
            console.log('files', files);
        } catch (error) {
            setOrgImg(null);
            toastWarning((error as Error)?.message || 'Failed to load image');
        }
    }

    return (
        <div className="absolute inset-0 pointer-events-none">

            {/* <div className={`absolute left-4 top-0.5 pb-0.5 text-xs ${active ? 'text-slate-50 font-bold' : 'text-slate-100'}`}>
                {active ? 'Drop' : 'Load image'}
            </div> */}

            <UIDropContainer
                className={`w-full h-full ${active ? 'bg-green-700' : 'bg-transparent'} border-slate-500 border rounded cursor-pointer`}
                onDropped={handleDrop}
                activeAtom={activeAtom}
            >
                {/* <IconImagePlus className={`${active ? 'text-green-600/30' : 'text-slate-300'}   pointer-events-none`} /> */}
            </UIDropContainer>
        </div>
    );
}

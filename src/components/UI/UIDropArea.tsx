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
    const activeListenersRef = useRef(0);
    useEffect(() => {
        function _onDragEnter(event: DragEvent) {
            if (!activeListenersRef.current++) {
                setDropActive(true);
            }
        }
        function _onDragOver(event: DragEvent) {
            event.preventDefault();
            event.stopPropagation();
            !dropActive && setDropActive(true);
        }
        function _onDragLeave(event: DragEvent) {
            if (!--activeListenersRef.current) {
                setDropActive(false);
            }
        }
        function _onDrop(event: DragEvent) {
            activeListenersRef.current = 0;
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

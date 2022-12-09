import { useEffect, useRef, useState } from "react";
import { atom, PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { orgImgAtom } from "@/store";
import { toastWarning } from "./UiToaster";
import { createImageFromBlob, loadFileData } from "@/utils/image-utils";

export function DragHandlers({ onDropped, activeAtom }: { onDropped: (files: FileList) => void; activeAtom: PrimitiveAtom<boolean>; }) {
    const setDropActive = useSetAtom(activeAtom);
    const activeListenersRef = useRef(0);

    useEffect(() => {
        function _onDragEnter() {
            if (!activeListenersRef.current++) {
                setDropActive(true);
            }
        }
        function _onDragOver(event: DragEvent) {
            event.preventDefault();
        }
        function _onDragLeave() {
            if (!--activeListenersRef.current) {
                setDropActive(false);
            }
        }
        function _onDrop(event: DragEvent) {
            event.preventDefault();
            activeListenersRef.current = 0;
            setDropActive(false);
            event.dataTransfer && onDropped(event.dataTransfer.files);
        }

        const a = document.addEventListener;
        a('dragenter', _onDragEnter);
        a('dragover', _onDragOver);
        a('dragleave', _onDragLeave);
        a('drop', _onDrop);

        return () => {
            const r = document.removeEventListener;
            r('dragenter', _onDragEnter);
            r('dragover', _onDragOver);
            r('dragleave', _onDragLeave);
            r('drop', _onDrop);
        };
    }, []);
    return (<></>);
}

export function DropArea() {
    const setOrgImg = useSetAtom(orgImgAtom);
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

    //console.log('active', active);

    return (<>
        <DragHandlers onDropped={handleDrop} activeAtom={activeAtom} />

        {active && <div className={`absolute inset-0 grid place-items-center text-5xl font-bold text-slate-50 bg-slate-800/90 z-10`}>
            Drop it!
        </div>}
    </>);
}

import { useEffect, useRef, useState } from "react";
import { atom, PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { doDroppedFilesAtom } from "@/store";

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
    const [activeAtom] = useState(atom(false));
    const active = useAtomValue(activeAtom);
    const doDroppedFiles = useSetAtom(doDroppedFilesAtom);
    return (<>
        <DragHandlers onDropped={doDroppedFiles} activeAtom={activeAtom} />

        {active && <div className={`absolute inset-0 grid place-items-center text-5xl font-bold text-slate-50 bg-slate-800/90 z-10`}>
            Drop it!
        </div>}
    </>);
}

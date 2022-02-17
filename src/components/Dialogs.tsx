import React from 'react';
import { useAtom } from 'jotai';
import { showHelpIdAtom } from '../store/store';
import { PortalModal } from './UI/UIDialog';
import { classNames } from '../utils/classnames';

function FormHelp({ editorData, setShow = (v: boolean) => { } }: { editorData: number; setShow?: (v: boolean) => void; }) {
    return (
        <div className={classNames(
            "max-w-[460px] max-h-[640px] bg-gray-200 rounded overflow-hidden", //w-[460px] h-[640px]
            "grid grid-rows-[min-content,1fr,min-content]")}
        >
            {/* Header */}
            <div className="px-2 py-3 text-xl font-bold leading-tight tracking-tight border-slate-500 border-b">Help</div>
            {/* Body */}
            <div className="min-w-[16rem] min-h-[6rem] p-2 text-sm">
                <div className="">TODO: Show help for topic: {editorData}</div>
                <div className="">TODO: github link</div>
            </div>
            {/* Buttons */}
            <div className="p-3 flex items-center justify-end">
                <button className="px-3 py-2 border-slate-500 border rounded" onClick={() => setShow(false)}>Close</button>
            </div>
        </div>
    );
}

function FormEditorTrigger() {
    const [editorData, setEditorData] = useAtom(showHelpIdAtom);
    return (
        <>
            {editorData &&
                <PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)} allowClickOutside={true}>
                    <FormHelp editorData={editorData} />
                </PortalModal>
            }
        </>
    );
}

export function Dialogs() {
    return (
        <FormEditorTrigger />
    );
}


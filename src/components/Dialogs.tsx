import React from 'react';
import { useAtom } from 'jotai';
import { showHelpIdAtom } from '../store/store';
import { PortalModal } from './UI/UIDialog';

function FormHelp({ editorData, setShow = (v: boolean) => { } }: { editorData: number; setShow?: (v: boolean) => void; }) {
    return (
        <div className="w-[460px] h-[640px] bg-gray-200 rounded overflow-hidden">
            <div className="px-2 py-3 text-xl font-bold leading-tight tracking-tight border-slate-500 border-b">Help</div>
            <div className="">Show help for topic {editorData}</div>
            <button className="" onClick={() => setShow(false)}>Close</button>
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

function Dialogs() {
    return (
        <FormEditorTrigger />
    );
}

export default Dialogs;

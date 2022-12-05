import React, { HTMLAttributes, SVGProps } from 'react';
import { useAtom } from 'jotai';
import { showHelpIdAtom } from '../../store/store';
import { PortalModal } from '../UI/UIDialog';
import { classNames } from '../../utils/classnames';

export function IconGithub(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg className="fill-current" width="32" height="32" viewBox="0 0 32 32" {...rest}>
            {title && <title>{title}</title>}
            <path
                fillRule="evenodd" clipRule="evenodd"
                d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z"
            />
        </svg>
    );
}

function FormHelp({ editorData, setShow = (v: boolean) => { } }: { editorData: number; setShow?: (v: boolean) => void; }) {
    return (
        <div className={classNames(
            "max-w-[460px] max-h-[640px] bg-gray-200 rounded overflow-hidden", //w-[460px] h-[640px]
            "grid grid-rows-[min-content,1fr,min-content]")}
        >
            {/* Header */}
            <div className="px-2 py-3 text-xl font-bold leading-tight tracking-tight border-slate-500 border-b">
                Instructions
            </div>

            {/* Body */}
            <div className="min-w-[16rem] min-h-[6rem] p-2 text-sm">
                <div className="w-6 text-center border-slate-400 border rounded">{editorData}</div>
                <ul className="list-disc space-y-2">
                    <li className="">Upload an image to create a cursor from</li>
                    <li className="">Select the desired cursor size</li>
                    <li className="">Apply transformations</li>
                </ul>

                {/* TODO: Show help for topic: {editorData}*/}
                <div className="">
                </div>
            </div>

            {/* Buttons */}
            <div className="p-3 flex items-center justify-between">
                {/* Link */}
                <a className="flex items-center space-x-2 text-sm scale-[.7] origin-left" href="https://github.com/maxzz/cursors" target="_blank">
                    <IconGithub />
                    <span>source code</span>
                </a>
                {/* Close */}
                <button className="px-3 py-2 border-slate-500 border rounded" onClick={() => setShow(false)}>Close</button>
            </div>
        </div>
    );
}

function FormEditorTrigger() {
    const [editorData, setEditorData] = useAtom(showHelpIdAtom);
    return (<>
        {editorData &&
            <PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)} allowClickOutside={true}>
                <FormHelp editorData={editorData} />
            </PortalModal>
        }
    </>);
}

export function Dialogs() {
    return (
        <FormEditorTrigger />
    );
}

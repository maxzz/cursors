import { showHelpIdAtom } from "@/store/store";
import { classNames } from "@/utils/classnames";
import { PortalModal } from "@ui/UIDialog";
import { IconGithub } from "@ui/UIIcons";
import { useAtom } from "jotai";
import { HTMLAttributes, SVGProps } from "react";

function IntroductionBody({ editorData, setShow = (v: boolean) => { } }: { editorData: number; setShow?: (v: boolean) => void; }) {
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

export function DialogIntroductionTrigger() {
    const [editorData, setEditorData] = useAtom(showHelpIdAtom);
    return (<>
        {editorData &&
            <PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)} allowClickOutside={true}>
                <IntroductionBody editorData={editorData} />
            </PortalModal>
        }
    </>);
}

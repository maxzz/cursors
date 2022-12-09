import { useAtom } from "jotai";
import { showHelpIdAtom } from "@/store";
import { classNames } from "@/utils/classnames";
import { PortalModal } from "@ui/UIDialog";
import { IconGithub } from "@ui/UIIcons";

function IntroductionBody({ editorData, setShow = (v: boolean) => { } }: { editorData: number; setShow?: (v: boolean) => void; }) {
    return (
        <div className={classNames(
            "min-w-[400px] min-h-[480px] bg-gray-200 rounded overflow-hidden",
            "grid grid-rows-[auto,1fr,auto]")}
        >
            {/* Header */}
            <div className="p-4 text-xl font-bold leading-tight tracking-tight border-slate-500 border-b">
                Instructions
            </div>

            {/* Body */}
            <div className="min-w-[16rem] min-h-[6rem] p-4 text-sm">
                {/* Number */}
                <div className="w-6 text-center border-slate-400 border rounded">
                    {editorData}
                </div>

                <ul className="mt-4 px-4 list-disc space-y-1">
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
                    <IconGithub className="w-8 h-8" />
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

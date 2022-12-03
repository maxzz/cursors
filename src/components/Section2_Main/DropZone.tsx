import { useState } from "react";
import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { orgImgAtom } from "../../store/store";
import { UIDropContainer } from "../UI/UIDropContainer";
import { IconImagePlus } from "../UI/UIIcons";
import { toastWarning } from "../UI/UiToaster";
import { createImageFromBlob, loadFileData } from "../../utils/image-utils";

export function DropZone() {
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

    return (
        <div className="relative">
            <div className={`absolute left-4 top-0.5 pb-0.5 text-xs ${active ? 'text-slate-50 font-bold' : 'text-slate-100'}`}>
                {active ? 'Drop' : 'Load image'}
            </div>
            <UIDropContainer
                className={`w-32 h-32 ${active ? 'bg-green-700' : 'bg-slate-400'} border-slate-500 border rounded cursor-pointer`}
                onDropped={handleDrop}
                activeAtom={activeAtom}
            >
                <IconImagePlus className={`${active ? 'text-green-600/30' : 'text-slate-300'}   pointer-events-none`} />
            </UIDropContainer>
        </div>
    );
}

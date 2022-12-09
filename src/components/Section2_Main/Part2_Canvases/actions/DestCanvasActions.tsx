import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { canvasElCtxDstAtom, orgImgAtom } from "@/store";
import { drawImage } from "@/utils/image-utils";
import { toastWarning } from "@ui/UiToaster";

export function DestCanvasActions() {
    const orgImg = useAtomValue(orgImgAtom);
    const elCtx = useAtomValue(canvasElCtxDstAtom);

    useEffect(() => {
        if (!elCtx) { return; }
        
        try {
            if (orgImg) {
                elCtx.el.width = orgImg.width;
                elCtx.el.height = orgImg.height;

                drawImage(elCtx, orgImg);
            } else {
                elCtx.ctx.clearRect(0, 0, elCtx.el.width, elCtx.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [elCtx, orgImg]);

    return null;
}

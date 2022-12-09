import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { canvasElCtxSrcAtom, orgImgAtom, showGrayAtom } from "@/store";
import { applyXOR, drawImage } from "@/utils/image-utils";
import { toastWarning } from "@ui/UiToaster";

export function SourceCanvasActions() {
    const orgImg = useAtomValue(orgImgAtom);
    const elCtx = useAtomValue(canvasElCtxSrcAtom);
    const showGray = useAtomValue(showGrayAtom);

    useEffect(() => {
        if (!elCtx) { return; }
        
        try {
            if (orgImg) {
                drawImage(elCtx, orgImg);

                showGray && applyXOR(elCtx, '#000000');
            } else {
                elCtx.ctx.clearRect(0, 0, elCtx.el.width, elCtx.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [elCtx, orgImg, showGray]);

    useEffect(() => {
        if (!elCtx) { return; }

        if (showGray) {
            showGray && applyXOR(elCtx, '#300000');
        } else {
            orgImg && drawImage(elCtx, orgImg);
        }
    }, [elCtx, showGray]);

    return null;
}

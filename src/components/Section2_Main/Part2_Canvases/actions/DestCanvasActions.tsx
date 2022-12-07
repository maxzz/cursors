import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { canvasBodyDstAtom, orgImgAtom } from "@/store";
import { drawImage } from "@/utils/image-utils";
import { toastWarning } from "@ui/UiToaster";

export function DestCanvasActions() {
    const orgImg = useAtomValue(orgImgAtom);
    const body = useAtomValue(canvasBodyDstAtom);

    useEffect(() => {
        if (!body) { return; }
        try {
            if (orgImg) {
                body.el.width = orgImg.width;
                body.el.height = orgImg.height;

                drawImage(body, orgImg);
            } else {
                body.ctx.clearRect(0, 0, body.el.width, body.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [body, orgImg]);

    return null;
}

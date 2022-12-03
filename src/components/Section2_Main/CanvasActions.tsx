import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { canvasBodyDstAtom, canvasBodySrcAtom, orgImgAtom, showGrayAtom } from "@/store/store";
import { applyXOR, drawImage } from "@/utils/image-utils";
import { toastWarning } from "@ui/UiToaster";

export function SourceCanvasActions() {
    const orgImg = useAtomValue(orgImgAtom);
    const body = useAtomValue(canvasBodySrcAtom);
    const showGray = useAtomValue(showGrayAtom);

    useEffect(() => {
        if (!body) { return; }
        try {
            if (orgImg) {
                drawImage(body, orgImg);

                showGray && applyXOR(body, '#000000');
            } else {
                body.ctx.clearRect(0, 0, body.el.width, body.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [body, orgImg, showGray]);

    useEffect(() => {
        if (!body) { return; }
        if (showGray) {
            showGray && applyXOR(body, '#300000');
        } else {
            orgImg && drawImage(body, orgImg);
        }
    }, [body, showGray]);

    return null;
}

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

export function NoUiCanvasActions() {
    return (<>
        <SourceCanvasActions />
        <DestCanvasActions />
    </>);
}

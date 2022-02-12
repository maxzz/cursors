import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { canvasBody2Atom, canvasBodyAtom, orgImgAtom, showGrayAtom } from "../store/store";
import { applyXOR, drawImage } from "../utils/image-utils";
import { toastWarning } from "./UI/UiToaster";

export function SourceCanvasActions() {
    const orgImg = useAtomValue(orgImgAtom);
    const canvasBody = useAtomValue(canvasBodyAtom);
    const showGray = useAtomValue(showGrayAtom);

    useEffect(() => {
        if (!canvasBody) { return; }
        try {
            if (orgImg) {
                drawImage(canvasBody, orgImg);

                showGray && applyXOR(canvasBody, '#000000');
            } else {
                canvasBody.ctx.clearRect(0, 0, canvasBody.el.width, canvasBody.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [canvasBody, orgImg, showGray]);

    useEffect(() => {
        if (!canvasBody) { return; }
        if (showGray) {
            showGray && applyXOR(canvasBody, '#300000');
        } else {
            orgImg && drawImage(canvasBody, orgImg);
        }
    }, [canvasBody, showGray]);

    return null;
}

export function DestCanvasActions() {
    const orgImg = useAtomValue(orgImgAtom);
    const canvasBody2 = useAtomValue(canvasBody2Atom);

    useEffect(() => {
        if (!canvasBody2) { return; }
        try {
            if (orgImg) {
                canvasBody2.el.width = orgImg.width;
                canvasBody2.el.height = orgImg.height;

                drawImage(canvasBody2, orgImg);
            } else {
                canvasBody2.ctx.clearRect(0, 0, canvasBody2.el.width, canvasBody2.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [canvasBody2, orgImg]);

    return null;
}

export function CanvasActions() {
    return (<>
        <SourceCanvasActions />
        <DestCanvasActions />
    </>);
}

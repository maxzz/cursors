import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, canvasAtom, canvasCtxAtom } from "../store/store";
import { applyXOR, convertToGray, drawImage } from "../utils/image-utils";
import { toastWarning } from "./UI/UiToaster";
import { DropZone } from "./DropZone";

function CheckBox() {
    const [showGray, setShowGray] = useAtom(showGrayAtom);
    return (
        <label className="flex items-center space-x-2 select-none">
            <input
                className="w-4 h-4 text-slate-500 bg-purple-200 focus:ring-slate-500 focus:ring-offset-1 rounded"
                type="checkbox"
                checked={showGray}
                onChange={(e) => setShowGray(e.target.checked)}
            />
            <div className="">show gray</div>
        </label>
    );
}

function CursorCanvas() {
    const setCanvas = useUpdateAtom(canvasAtom);
    return (
        <canvas ref={setCanvas} className="my-1 bg-slate-300" />
    );
}

export function AppCanvas() {
    const orgImg = useAtomValue(orgImgAtom);
    const canvas = useAtomValue(canvasAtom);
    const canvasCtx = useAtomValue(canvasCtxAtom);
    const showGray = useAtomValue(showGrayAtom);

    useEffect(() => {
        if (!canvas || !canvasCtx) { return; }
        try {
            if (orgImg) {
                canvas.width = orgImg.width;
                canvas.height = orgImg.height;
                drawImage(canvasCtx, canvas, orgImg);
                //showGray && convertToGray(canvasCtx, canvas);
                showGray && applyXOR(canvasCtx, canvas, '#000000');
            } else {
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [canvas, canvasCtx, orgImg]);

    useEffect(() => {
        if (!canvas || !canvasCtx) { return; }
        if (showGray) {
            convertToGray(canvasCtx, canvas);
        } else {
            orgImg && drawImage(canvasCtx, canvas, orgImg);
        }
    }, [canvas, canvasCtx, showGray]);

    return (
        <>
            <DropZone />
            <CursorCanvas />
            {orgImg && <CheckBox />}
        </>
    );
}

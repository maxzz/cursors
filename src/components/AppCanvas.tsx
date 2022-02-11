import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, canvasBodyAtom, canvasBody2Atom } from "../store/store";
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
    const setCanvas = useUpdateAtom(canvasBodyAtom);
    return (
        <canvas ref={setCanvas} className="my-1 bg-slate-300" />
    );
}

function DestCanvas() {
    const setCanvas = useUpdateAtom(canvasBody2Atom);
    return (
        <canvas ref={setCanvas} className="my-1 bg-slate-300" />
    );
}

export function AppCanvas() {
    const orgImg = useAtomValue(orgImgAtom);
    const canvasBody = useAtomValue(canvasBodyAtom);
    const canvasBody2 = useAtomValue(canvasBody2Atom);
    const showGray = useAtomValue(showGrayAtom);

    useEffect(() => {
        if (!canvasBody) { return; }
        try {
            if (orgImg) {
                // canvas.width = orgImg.width;
                // canvas.height = orgImg.height;

                canvasBody.ctx.beginPath();
                drawImage(canvasBody.ctx, canvasBody.el, orgImg);

                //showGray && convertToGray(canvasCtx, canvas);
                showGray && applyXOR(canvasBody.ctx, canvasBody.el, '#000000');
            } else {
                canvasBody.ctx.clearRect(0, 0, canvasBody.el.width, canvasBody.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [canvasBody, orgImg, showGray]);

    useEffect(() => {
        if (!canvasBody2) { return; }
        try {
            if (orgImg) {
                canvasBody2.el.width = orgImg.width;
                canvasBody2.el.height = orgImg.height;

                canvasBody2.ctx.beginPath();
                drawImage(canvasBody2.ctx, canvasBody2.el, orgImg);

                //showGray && convertToGray(canvasCtx, canvas);
                //showGray && applyXOR(canvasBody2.ctx, canvasBody2.el, '#000000');
            } else {
                canvasBody2.ctx.clearRect(0, 0, canvasBody2.el.width, canvasBody2.el.height);
            }
        } catch (error) {
            toastWarning(`Failed to render image`);
            console.log('Failed to render image', error);
        }
    }, [canvasBody2, orgImg]);

    useEffect(() => {
        if (!canvasBody) { return; }
        if (showGray) {
            //convertToGray(canvasCtx, canvas);
            showGray && applyXOR(canvasBody.ctx, canvasBody.el, '#300000');
        } else {
            orgImg && drawImage(canvasBody.ctx, canvasBody.el, orgImg);
        }
    }, [canvasBody, showGray]);

    return (
        <>
            <DropZone />
            <CursorCanvas />
            <DestCanvas />
            {orgImg && <CheckBox />}
        </>
    );
}

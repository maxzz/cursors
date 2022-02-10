import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { showGrayAtom, orgImgAtom, canvasAtom, canvasCtxAtom } from "../store/store";
import { convertToGray, drawImage } from "../utils/image-utils";
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
    const [canvas, setCanvas] = useAtom(canvasAtom);
    return (
        <canvas ref={setCanvas} className="my-1 bg-slate-300" />
    );
}

export function AppCanvas() {
    const orgImg = useAtomValue(orgImgAtom);
    const canvas = useAtomValue(canvasAtom);
    const showGray = useAtomValue(showGrayAtom);

    useEffect(() => {
        if (!canvas) { return; }
        async function handleIngChange() {
            try {
                const ctx = canvas?.getContext('2d');
                if (!canvas || !ctx) {
                    return;
                }
                if (orgImg) {
                    drawImage(ctx, canvas, orgImg);
                    showGray && convertToGray(ctx, canvas);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            } catch (error) {
                toastWarning(`Failed to render image`);
                console.log('Failed to render image', error);
            }
        }
        handleIngChange();
    }, [canvas, orgImg]);

    useEffect(() => {
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) {
            return;
        }
        if (showGray) {
            convertToGray(ctx, canvas);
        } else {
            orgImg && drawImage(ctx, canvas, orgImg);
        }
    }, [canvas, showGray]);

    return (
        <>
            <DropZone />
            <CursorCanvas />
            {orgImg && <CheckBox />}
        </>
    );
}

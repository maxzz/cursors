import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { showGrayAtom, orgImgAtom } from "../store/store";
import { convertToGray, createImageFromBlob, drawImage, loadFileData } from "../utils/image-utils";
import { DropContainer } from "./DropContainer";
import { toastWarning } from "./UI/UiToaster";

export function DropZone() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [orgImg, setOrgImg] = useAtom(orgImgAtom);
    const [showGray, setShowGray] = useAtom(showGrayAtom);

    async function handleDrop(files: FileList) {
        if (!files.length) { return; }
        try {
            const blob = await loadFileData(files[0]);
            const img: HTMLImageElement = await createImageFromBlob(blob);
            setOrgImg(img);
        } catch (error) {
            setOrgImg(null);
            toastWarning(`Failed to load image ${(error as Error)?.message || ''}`);
            console.log('Failed to load image', error);
        }
    }

    useEffect(() => {
        if (!canvasRef.current) { return; }
        async function handleIngChange() {
            try {
                const canvas = canvasRef.current;
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
    }, [orgImg]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) {
            return;
        }
        if (showGray) {
            convertToGray(ctx, canvas);
        } else {
            orgImg && drawImage(ctx, canvas, orgImg);
        }
    }, [showGray]);

    return (
        <>
            <DropContainer onDropped={handleDrop} />
            <canvas ref={canvasRef} className="bg-slate-300" />
            <label className="flex items-center space-x-2">
                <input className="w-4 h-4" type="checkbox" value={+showGray} onChange={(e) => setShowGray(e.target.checked)} />
                <div className="">show gray</div>
            </label>
        </>
    );
}

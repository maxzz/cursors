import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { orgImgAtom } from "../store/store";
import { convertToGray, createImageFromBlob, drawImage, loadFileData } from "../utils/image-utils";
import { DropContainer } from "./DropContainer";
import { toastWarning } from "./UI/UiToaster";

export function DropZone() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [orgImg, setOrgImg] = useAtom(orgImgAtom);

    async function handleDrop(files: FileList) {
        if (!files.length) { return; }
        try {
            const blob = await loadFileData(files[0]);
            const img: HTMLImageElement = await createImageFromBlob(blob);
            setOrgImg(img);
        } catch (error) {
            setOrgImg(null);
            toastWarning(`failed to load image ${(error as Error)?.message}}`);
            console.log('failed to load image', error);
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
                    convertToGray(ctx, canvas);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            } catch (error) {
                toastWarning(`failed to render image`);
                console.log('failed to render image', error);
            }
        }
        handleIngChange();
    }, [orgImg]);

    return (
        <>
            <DropContainer onDropped={handleDrop} />
            <canvas ref={canvasRef} className="bg-slate-300" />
        </>
    );
}

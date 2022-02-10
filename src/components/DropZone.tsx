import React, { useEffect, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom } from "../store/store";
import { convertToGray, createImageFromBlob, drawImage, loadFileData } from "../utils/image-utils";
import { DropContainer } from "./DropContainer";
import { toastWarning } from "./UI/UiToaster";
import { IconImagePlus } from "./UI/UIIcons";

function DropZone() {
    const setOrgImg = useUpdateAtom(orgImgAtom);
    const [activeAtom] = useState(atom(false));
    const active = useAtomValue(activeAtom);

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
    return (
        <div className="">
            <div className="">Load image</div>
            <DropContainer
                className={`w-32 h-32 ${active ? 'bg-pink-400' : 'bg-slate-400'} border-slate-500 border rounded cursor-pointer`}
                onDropped={handleDrop}
                activeAtom={activeAtom}
            >
                <IconImagePlus />
            </DropContainer>
        </div>
    );
}

export function AppCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const orgImg = useAtomValue(orgImgAtom);
    const [showGray, setShowGray] = useAtom(showGrayAtom);

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
            <DropZone />
            <canvas ref={canvasRef} className="my-1 bg-slate-300" />
            {orgImg &&
                <label className="flex items-center space-x-2 select-none">
                    <input
                        className="w-4 h-4 text-slate-500 bg-purple-200 focus:ring-slate-500 focus:ring-offset-1 rounded"
                        type="checkbox"
                        checked={showGray}
                        onChange={(e) => setShowGray(e.target.checked)}
                    />
                    <div className="">show gray</div>
                </label>
            }
        </>
    );
}

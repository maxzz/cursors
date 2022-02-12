import React, { useEffect } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, canvasBodyAtom, canvasBody2Atom, CanvasBody, CanvasBodyAtomType } from "../store/store";
import { applyXOR, convertToGray, drawImage } from "../utils/image-utils";
import { toastWarning } from "./UI/UiToaster";
import { DropZone } from "./DropZone";
import { classNames } from "../utils/classnames";

function CheckBox({ className, ...rest }: React.HTMLAttributes<HTMLLabelElement>) {
    const [showGray, setShowGray] = useAtom(showGrayAtom);
    return (
        <label className={classNames("flex items-center space-x-2 select-none", className)} {...rest}>
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

function CanvasElement({ updateAtom, ...rest }: { updateAtom: CanvasBodyAtomType; } & React.HTMLAttributes<HTMLCanvasElement>) {
    const setCanvas = useUpdateAtom(updateAtom);
    return (
        <canvas ref={setCanvas} {...rest} />
    );
}

function CanvasElements() {
    return (
        <div className="flex gap-4">
            <div className="border-red-700 border">
                <CanvasElement className="bg-slate-300" updateAtom={canvasBodyAtom} />
            </div>
            <div className="border-red-700 border">
                <CanvasElement className="bg-slate-300" updateAtom={canvasBody2Atom} />
            </div>
        </div>
    );
}

function CanvasActions() {
    const orgImg = useAtomValue(orgImgAtom);
    const canvasBody = useAtomValue(canvasBodyAtom);
    const canvasBody2 = useAtomValue(canvasBody2Atom);
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

export function AppCanvas() {
    const orgImg = useAtomValue(orgImgAtom);
    return (
        <div className="h-full flex flex-col">
            {/* No UI actions */}
            <CanvasActions />

            {/* Drop zone */}
            <div className="flex space-x-2">
                <DropZone />
                {orgImg && <CheckBox className="self-end pb-1" />}
            </div>

            {/* The rest */}
            <div className="flex-1 flex items-center justify-center">
                <CanvasElements />
            </div>
        </div>
    );
}

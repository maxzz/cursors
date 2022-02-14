import React, { ChangeEvent } from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, canvasBodySrcAtom, canvasBodyDstAtom, CanvasBodyAtomType, cursorSizeAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { DropZone } from "./DropZone";
import { CanvasActions } from "./CanvasActions";
import { CanvasElements } from "./CanvasElements";

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

const CURSOR_SIZES = [16, 32, 64, 128, 256];

function SizeSelector() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="self-start flex items-center space-x-2">
            {CURSOR_SIZES.map((item, idx) => (
                <label key={item} className="text-xs flex items-center space-x-1">
                    <input type="radio" value={item} checked={size === item} onChange={onChange} />
                    <div className="">{item}</div>
                </label>
            ))}
        </div>
    );
}

function SizeSelectorSlider() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="self-start flex items-center space-x-2">
            <label className="flex items-center">
                <div className="">Size</div>
                <input type="range" value={size} onChange={(event) => setSize(+event.target.value)} />
                <input type="text" value={size} onChange={(event) => setSize(+event.target.value)}/>
            </label>
        </div>
    );
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
                <div className="">
                    <div className="">Cursor size</div>
                    <SizeSelector />
                    <SizeSelectorSlider />
                </div>
            </div>

            {/* The rest */}
            <div className="flex-1 flex items-center justify-center">
                <CanvasElements />
            </div>
        </div>
    );
}

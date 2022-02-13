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

function SizeSelector() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(+event.target.value);
        setSize(+event.target.value);
    }
    return (
        <div className="self-start flex items-center space-x-2">
            <label><input type="radio" value={0} checked={size === 0} onChange={onChange}/>16</label>
            <label><input type="radio" value={1} checked={size === 1} onChange={onChange}/>32</label>
            <label><input type="radio" value={2} checked={size === 2} onChange={onChange}/>64</label>
            <label><input type="radio" value={3} checked={size === 3} onChange={onChange}/>128</label>
            <label><input type="radio" value={4} checked={size === 4} onChange={onChange}/>256</label>
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
                <SizeSelector />
            </div>

            {/* The rest */}
            <div className="flex-1 flex items-center justify-center">
                <CanvasElements />
            </div>
        </div>
    );
}

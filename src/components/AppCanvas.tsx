import React from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { showGrayAtom, orgImgAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { DropZone } from "./DropZone";
import { CanvasActions } from "./CanvasActions";
import { CanvasElements } from "./CanvasElements";
import { CursorSizeSelector } from "./CursorSizeSelector";

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
                <CursorSizeSelector />
            </div>

            {/* The rest */}
            <div className="flex-1 flex items-center justify-center">
                <CanvasElements />
            </div>
        </div>
    );
}

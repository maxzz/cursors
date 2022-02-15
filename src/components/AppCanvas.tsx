import React from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, showHelpIdAtom } from "../store/store";
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
    const showHelp = useUpdateAtom(showHelpIdAtom);
    return (
        <div className="h-full flex flex-col">
            {/* No UI actions */}
            <CanvasActions />

            {/* Drop zone */}
            <div className="flex space-x-2">
                <DropZone />
                <CursorSizeSelector />
                <div className="p-2">
                    <div
                        className="w-6 h-6 pt-px text-sm text-center font-bold font-serif text-amber-900 bg-amber-400 border-amber-600 border rounded-md active:scale-[.97] cursor-pointer"
                        title="info"
                        onClick={() => showHelp(1)}
                    >
                        i
                    </div>
                </div>
                {orgImg && <CheckBox className="self-end pb-1" />}
            </div>

            {/* The rest */}
            <div className="flex-1 flex items-center justify-center">
                <CanvasElements />
            </div>
        </div>
    );
}

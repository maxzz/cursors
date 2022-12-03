import React from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, showHelpIdAtom } from "@/store/store";
import { classNames } from "@/utils/classnames";
import { DropZone } from "./DropZone";
import { CanvasActions } from "./CanvasActions";
import { CanvasElements } from "./CanvasElements";
import { CursorSizeSelector } from "./CursorSizeSelector";
import { CursorTester } from "./CursorTester";

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

function InfoTrigger({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    const showHelp = useUpdateAtom(showHelpIdAtom);
    return (
        <div
            className={classNames("w-6 h-6 pt-px text-sm text-center font-bold font-serif text-slate-700 bg-slate-300 border-slate-500 border rounded-md active:scale-[.97] cursor-pointer", className)}
            title="info"
            onClick={() => showHelp(1)}
            {...rest}
        >
            i
        </div>
    );
}

export function Section2_Main() {
    const orgImg = useAtomValue(orgImgAtom);
    return (<>

        {/* Drop zone */}
        <div className="flex flex-col space-y-2">
            <div className="h-32 self-center flex space-x-2">
                <DropZone />
                <div className="flex flex-col justify-between">
                    <InfoTrigger />
                    <CursorSizeSelector />
                </div>
            </div>

            <div className="flex flex-col justify-between">
                {orgImg && <CheckBox className="" />}
            </div>
        </div>

        {/* No UI actions */}
        <CanvasActions />

        {/* The rest */}
        <div className="flex-1 flex flex-col justify-center gap-y-4">
            <div className="flex items-center justify-center">
                <CanvasElements />
            </div>
            <div>
                <CursorTester />
            </div>
        </div>

    </>);
}

import React from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, showHelpIdAtom } from "@/store/store";
import { classNames } from "@/utils/classnames";
import { DropZone } from "./Part1_TopControls/DropZone";
import { CanvasActions } from "./CanvasActions";
import { CanvasElements } from "./CanvasElements";
import { CursorSizeSelector } from "./Part1_TopControls/CursorSizeSelector";
import { CursorTester } from "./CursorTester";
import { Part1_TopControls } from "./Part1_TopControls";

export function Section2_Main() {
    return (<>
        <Part1_TopControls />

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

import React from "react";
import { NoUiCanvasActions } from "./CanvasActions";
import { CanvasElements } from "./CanvasElements";
import { CursorTester } from "./CursorTester";
import { Part1_TopControls } from "./Part1_TopControls";

export function Section2_Main() {
    return (<>
        <Part1_TopControls />

        <NoUiCanvasActions />

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

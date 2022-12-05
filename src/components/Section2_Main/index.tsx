import React from "react";
import { NoUiCanvasActions } from "./Part2_Canvases/CanvasActions";
import { Part2_Canvases } from "./Part2_Canvases";
import { CursorTester } from "./Part3_Display/CursorTester";
import { Part1_TopControls } from "./Part1_TopControls";

export function Section2_Main() {
    return (<>
        <Part1_TopControls />

        <NoUiCanvasActions />

        <div className="flex-1 flex flex-col justify-center gap-y-4">
            <div className="flex items-center justify-center">
                <Part2_Canvases />
            </div>
            <div>
                <CursorTester />
            </div>
        </div>
    </>);
}

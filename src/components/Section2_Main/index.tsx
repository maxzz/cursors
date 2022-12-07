import React from "react";
import { NoUiCanvasActions } from "./Part2_Canvases/NoUiCanvasActions";
import { Part1_TopControls } from "./Part1_TopControls";
import { Part2_Canvases } from "./Part2_Canvases";
import { Part3_Display } from "./Part3_Display";

export function Section2_Main() {
    return (<>
        <Part1_TopControls />

        <div className="flex-1 flex flex-col justify-center gap-y-4">
            <div className="flex items-center justify-center">
                <NoUiCanvasActions />
                <Part2_Canvases />
            </div>

            <Part3_Display />
        </div>
    </>);
}

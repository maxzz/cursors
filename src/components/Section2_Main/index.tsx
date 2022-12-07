import React, { HTMLAttributes } from "react";
import { NoUiCanvasActions } from "./Part2_Canvases/actions";
import { Part1_TopControls } from "./Part1_TopControls";
import { Part2_Canvases } from "./Part2_Canvases";
import { Part3_Display } from "./Part3_Display";
import { classNames } from "@/utils/classnames";

export function Section2_Main({className, ...rest}: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("px-4 flex flex-col justify-center gap-y-4", className)} {...rest}>
            <Part1_TopControls />

            <div className="flex items-center justify-center">
                <NoUiCanvasActions />
                <Part2_Canvases />
            </div>

            <Part3_Display />
        </div>
    );
}

import { useSetAtom } from "jotai";
import { CanvasBodyAtomType, canvasBodyDstAtom, canvasBodySrcAtom } from "@/store";
import { CanvasElementWAtom } from "./CanvasElementWAtom";

export function Part2_Canvases() {
    return (
        <div className="flex gap-4">
            <div className="w-full aspect-square border-sky-700 border">
                <CanvasElementWAtom className="w-full h-full bg-slate-300" updateAtom={canvasBodySrcAtom} />
            </div>
            <div className="w-full aspect-square border-sky-700 border">
                <CanvasElementWAtom className="w-full h-full bg-slate-300" updateAtom={canvasBodyDstAtom} />
            </div>
        </div>
    );
}

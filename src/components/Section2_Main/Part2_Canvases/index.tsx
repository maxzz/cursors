import { canvasElCtxDstAtom, canvasElCtxSrcAtom } from "@/store";
import { CanvasElementWAtom } from "@ui/UICanvasElementWAtom";

export function Part2_Canvases() {
    return (
        <div className="flex gap-4">
            <div className="w-full aspect-square border-sky-700 border">
                <CanvasElementWAtom className="w-full h-full bg-slate-300" updateAtom={canvasElCtxSrcAtom} />
            </div>
            <div className="w-full aspect-square border-sky-700 border">
                <CanvasElementWAtom className="w-full h-full bg-slate-300" updateAtom={canvasElCtxDstAtom} />
            </div>
        </div>
    );
}

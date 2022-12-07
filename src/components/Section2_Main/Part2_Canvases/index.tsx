import { useSetAtom } from "jotai";
import { CanvasBodyAtomType, canvasBodyDstAtom, canvasBodySrcAtom } from "@/store";

function CanvasElement({ updateAtom, ...rest }: { updateAtom: CanvasBodyAtomType; } & React.HTMLAttributes<HTMLCanvasElement>) {
    const setCanvas = useSetAtom(updateAtom);
    return (
        <canvas ref={setCanvas} {...rest} />
    );
}

export function Part2_Canvases() {
    return (
        <div className="flex gap-4">
            <div className="w-full aspect-square border-sky-700 border">
                <CanvasElement className="w-full h-full bg-slate-300" updateAtom={canvasBodySrcAtom} />
            </div>
            <div className="w-full aspect-square border-sky-700 border">
                <CanvasElement className="w-full h-full bg-slate-300" updateAtom={canvasBodyDstAtom} />
            </div>
        </div>
    );
}

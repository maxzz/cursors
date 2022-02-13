import { useUpdateAtom } from "jotai/utils";
import { CanvasBodyAtomType, canvasBodyDstAtom, canvasBodySrcAtom } from "../store/store";

function CanvasElement({ updateAtom, ...rest }: { updateAtom: CanvasBodyAtomType; } & React.HTMLAttributes<HTMLCanvasElement>) {
    const setCanvas = useUpdateAtom(updateAtom);
    return (
        <canvas ref={setCanvas} {...rest} />
    );
}

export function CanvasElements() {
    return (
        <div className="flex gap-4">
            <div className="border-red-700 border">
                <CanvasElement className="bg-slate-300" updateAtom={canvasBodySrcAtom} />
            </div>
            <div className="border-red-700 border">
                <CanvasElement className="bg-slate-300" updateAtom={canvasBodyDstAtom} />
            </div>
        </div>
    );
}

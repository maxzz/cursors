import { useSetAtom } from "jotai";
import { CanvasBodyAtomType, canvasBodyDstAtom, canvasBodySrcAtom } from "@/store";

export function CanvasElementWAtom({ updateAtom, ...rest }: { updateAtom: CanvasBodyAtomType; } & React.HTMLAttributes<HTMLCanvasElement>) {
    const setCanvas = useSetAtom(updateAtom);
    return (
        <canvas ref={setCanvas} {...rest} />
    );
}

import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { canvasBodyDstAtom, canvasBodySrcAtom, orgImgAtom, showGrayAtom } from "@/store";
import { applyXOR, drawImage } from "@/utils/image-utils";
import { toastWarning } from "@ui/UiToaster";
import { SourceCanvasActions } from "./SrcCanvasActions";
import { DestCanvasActions } from "./DstCanvasActions";

export function NoUiCanvasActions() {
    return (<>
        <SourceCanvasActions />
        <DestCanvasActions />
    </>);
}

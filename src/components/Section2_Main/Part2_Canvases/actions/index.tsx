import { SourceCanvasActions } from "./SourceCanvasActions";
import { DestCanvasActions } from "./DestCanvasActions";

export function NoUiCanvasActions() {
    return (<>
        <SourceCanvasActions />
        <DestCanvasActions />
    </>);
}

import { ChangeEvent } from "react";
import { useAtom } from "jotai";
import { cursorSizeAtom } from "../store/store";

const CURSOR_SIZES = [16, 32, 64, 128, 256];

function SizeSelectorSlider() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="">
            <label className="h-6 text-sm flex items-center space-x-2">
                <div className="">Size</div>
                <input type="range" value={size} onChange={(event) => setSize(+event.target.value)} />
                <div className="">
                    <input className="w-10 text-center" type="text" value={size} onChange={(event) => setSize(+event.target.value)} />
                </div>
            </label>
        </div>
    );
}

function CursorSizeSelectorButtons() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="self-start flex items-center space-x-2">
            {CURSOR_SIZES.map((item, idx) => (
                <label key={item} className="text-xs flex items-center space-x-1">
                    <input className="form-radio" type="radio" value={item} checked={size === item} onChange={onChange} />
                    <div className="">{item}</div>
                </label>
            ))}
        </div>
    );
}

export function CursorSizeSelector() {
    const [size, setSize] = useAtom(cursorSizeAtom);
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setSize(+event.target.value);
    }
    return (
        <div className="self-start flex flex-col space-y-4">
            <CursorSizeSelectorButtons />
            <SizeSelectorSlider />
        </div>
    );
}

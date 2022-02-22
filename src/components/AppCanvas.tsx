import React from "react";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { showGrayAtom, orgImgAtom, showHelpIdAtom } from "../store/store";
import { classNames } from "../utils/classnames";
import { DropZone } from "./DropZone";
import { CanvasActions } from "./CanvasActions";
import { CanvasElements } from "./CanvasElements";
import { CursorSizeSelector } from "./CursorSizeSelector";
import CursorTester from "./CursorTester";
import { a, AnimationResult, config, useTransition } from "@react-spring/web";

function CheckBox({ className, ...rest }: React.HTMLAttributes<HTMLLabelElement>) {
    const [showGray, setShowGray] = useAtom(showGrayAtom);
    return (
        <label className={classNames("flex items-center space-x-2 select-none", className)} {...rest}>
            <input
                className="w-4 h-4 text-slate-500 bg-purple-200 focus:ring-slate-500 focus:ring-offset-1 rounded"
                type="checkbox"
                checked={showGray}
                onChange={(e) => setShowGray(e.target.checked)}
            />
            <div className="">show gray</div>
        </label>
    );
}

function InfoTrigger({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    const showHelp = useUpdateAtom(showHelpIdAtom);
    return (
        <div
            className={classNames("w-6 h-6 pt-px text-sm text-center font-bold font-serif text-slate-700 bg-slate-300 border-slate-500 border rounded-md active:scale-[.97] cursor-pointer", className)}
            title="info"
            onClick={() => showHelp(1)}
            {...rest}
        >
            i
        </div>
    );
}
/*
type Item = {
    key: number;
    text: string;
};

function Transitions() {
    const [items, set] = React.useState([{
        key: 1,
        text: 'abc',
    }]);

    const transitions = useTransition<Item, {}>(items, {
        from: { transform: 'translate3d(0,-40px,0)' },
        enter: { transform: 'translate3d(0,0px,0)' },
        leave: { transform: 'translate3d(0,-40px,0)' },
        key: (item: Item) => item.key
    });

    return <div className="">
        {transitions(({ props, key }: { props: any, key: number; }, item: Item) => (
            <a.div style={props} key={key}>
                {item.text}
            </a.div>
        ))}
    </div>;
}
*/

let TestCount = 0;

type Item = boolean;

function Mount() {
    const [show, set] = React.useState(false);
    const transitions = useTransition<Item, {}>(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        //reverse: show,
        //delay: 1200,
        key: (item: Item) => item ? 0 : 1,
        //config: config.molasses,
        config: { duration: 1000 },
        //onRest: () => set(!show),
        onRest: (result: any, ctrl: any, item: Item) => {
            console.log('......onRest......', 'cnt:', TestCount++, 'useState of show', show, 'item', item, { result, ctrl });
        },
        onDestroyed: (item: Item, key: any) => {
            console.log('---onDestroyed--- ', 'cnt:', TestCount, 'useState of show', show, 'item', item, 'key', key);
        }
    });
    return <div className="">
        <button onClick={() => {
            console.log('=================================== set show', !show);
            set(!show);
        }} className="px-2 py-1 border-slate-500 border rounded focus:scale-[.97]">Show/Hide</button>
        {transitions(
            (styles, item, t, i) => {
                console.log('from transition():', 'cnt:', TestCount, 'useState of show', show, 'item', item, 'idx', i, 'transition', t);

                return item && <a.div style={styles} className="text-3xl">✌️</a.div>;
            }
        )}
    </div>;
}

export function AppCanvas() {
    const orgImg = useAtomValue(orgImgAtom);
    return (
        <div className="h-full flex flex-col">
            {/* No UI actions */}
            <CanvasActions />
            <Mount />

            {/* Drop zone */}
            <div className="flex flex-col space-y-2">
                <div className="h-32 self-center flex space-x-2">
                    <DropZone />
                    <div className="flex flex-col justify-between">
                        <InfoTrigger />
                        <CursorSizeSelector />
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    {orgImg && <CheckBox className="" />}
                </div>
            </div>

            {/* The rest */}
            <div className="flex-1 flex flex-col justify-center gap-y-4">
                <div className="flex items-center justify-center">
                    <CanvasElements />
                </div>
                <div>
                    <CursorTester />
                </div>
            </div>
        </div>
    );
}

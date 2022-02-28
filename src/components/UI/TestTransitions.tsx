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

import { a, useTransition } from "@react-spring/web";
import React from "react";

type Item = boolean;

export function Mount() {
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
            console.log('......onRest......', `useState-of-show =`, show, 'item', item, { result, ctrl });
        },
        onDestroyed: (item: Item, key: any) => {
            console.log('---onDestroyed--- ', `useState-of-show =`, show, 'item', item, 'key', key);
        }
    });
    return <div className="">
        <button onClick={() => {
            console.log('=================================== set show', !show);
            set(!show);
        }} className="px-2 py-1 border-slate-500 border rounded focus:scale-[.97]">Show/Hide</button>
        {transitions(
            (styles, item, t, i) => {
                console.log('from transition():', `useState-of-show =`, show, 'item', item, 'idx', i, 'transition', t);

                return item && <a.div style={styles} className={`text-3xl hue-rotate-90`}>✌️</a.div>;
            }
        )}
    </div>;
}

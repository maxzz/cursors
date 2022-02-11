import { atom, Getter, PrimitiveAtom, SetStateAction, Setter } from "jotai";

export type ViewPoint = { x: number; y: number; };
export type ViewSize = { w: number; h: number; };
export type ViewBox = ViewPoint & ViewSize;

// source image

export const orgImgAtom = atom<HTMLImageElement | null>(null);

// canvas body

type CanvasBody = {
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};

function atomCanvasUpdate(get: Getter, set: Setter, value: SetStateAction<HTMLCanvasElement | null | undefined>, atomToSet: PrimitiveAtom<CanvasBody | null | undefined>) {
    let newBody: CanvasBody | null | undefined;
    if (value) {
        let el = typeof value === 'function' ? value(get(atomToSet)?.el) : value;
        let ctx = value && el?.getContext('2d');
        newBody = el && ctx && { el, ctx, };
    }
    set(atomToSet, newBody);
}

const _canvasBodyAtom = atom<CanvasBody | null | undefined>(null);
export const canvasBodyAtom = atom(
    (get) => get(_canvasBodyAtom),
    (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => ((atom) => atomCanvasUpdate(get, set, value, atom))(_canvasBodyAtom)
);

const _canvasBody2Atom = atom<CanvasBody | null | undefined>(null);
export const canvasBody2Atom = atom(
    (get) => get(_canvasBody2Atom),
    (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => ((atom) => atomCanvasUpdate(get, set, value, atom))(_canvasBody2Atom)
);

// export const canvasBodyAtom = atom(
//     (get) => get(_canvasBodyAtom),
//     (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => {
//         let newBody: CanvasBody | null | undefined;
//         if (value) {
//             let el = typeof value === 'function' ? value(get(_canvasBodyAtom)?.el) : value;
//             let ctx = value && el?.getContext('2d');
//             newBody = el && ctx && { el, ctx, };
//         }
//         set(_canvasBodyAtom, newBody);
//     }
// );

// options

export const showGrayAtom = atom(true);

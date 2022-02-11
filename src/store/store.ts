import { atom, SetStateAction } from "jotai";

export type ViewPoint = { x: number; y: number; };
export type ViewSize = { w: number; h: number; };
export type ViewBox = ViewPoint & ViewSize;

// canvas

export const orgImgAtom = atom<HTMLImageElement | null>(null);

// const _canvasAtom = atom<HTMLCanvasElement | null>(null);
// export const canvasCtxAtom = atom<CanvasRenderingContext2D | null>(null);

// export const canvasAtom = atom(
//     (get) => get(_canvasAtom),
//     (get, set, el: HTMLCanvasElement | null) => {
//         set(_canvasAtom, el);
//         set(canvasCtxAtom, el ? el.getContext('2d') : null);
//     }
// );

type CanvasBody = {
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};

const _canvasBodyAtom = atom<CanvasBody | null | undefined>(null);

export const canvasBodyAtom = atom(
    (get) => get(_canvasBodyAtom),
    (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => {
        let newBody: CanvasBody | null | undefined;
        if (value) {
            let el = typeof value === 'function' ? value(get(_canvasBodyAtom)?.el) : value;
            let ctx = value && el?.getContext('2d');
            newBody = el && ctx && { el, ctx, };
        }
        set(_canvasBodyAtom, newBody);
    }
);

//

/*
const _canvasAtom = atom<HTMLCanvasElement | null>(null);
export const canvasCtxAtom = atom<CanvasRenderingContext2D | null>(null);

export const canvasAtom = atom(
    (get) => get(_canvasAtom),
    (get, set, el: HTMLCanvasElement | null) => {
        set(_canvasAtom, el);
        set(canvasCtxAtom, el ? el.getContext('2d') : null);
    }
);
*/
/*
export const doCanvasSizeAtom = atom(
    (get) => {
        const c = get(_canvasAtom);
        return c ? { w: c.width, h: c.height } : { w: 0, h: 0 };
    },
    (get, set, size: ViewSize) => {
        const c = get(_canvasAtom);
        if (c) {
            c.width = size.w;
            c.height = size.h;
        }
    }
);
*/
// options

export const showGrayAtom = atom(true);

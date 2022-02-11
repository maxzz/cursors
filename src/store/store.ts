import { atom } from "jotai";

export type ViewPoint = { x: number; y: number; };
export type ViewSize = { w: number; h: number; };
export type ViewBox = ViewPoint & ViewSize;

// canvas

export const orgImgAtom = atom<HTMLImageElement | null>(null);

const _canvasAtom = atom<HTMLCanvasElement | null>(null);
export const canvasCtxAtom = atom<CanvasRenderingContext2D | null>(null);

export const canvasAtom = atom(
    (get) => get(_canvasAtom),
    (get, set, el: HTMLCanvasElement | null) => {
        set(_canvasAtom, el);
        if (el) {
            set(canvasCtxAtom, el.getContext('2d'));
        } else {
            set(canvasCtxAtom, null);
        }
    }
);

export const canvasSizeAtom = atom(
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

// options

export const showGrayAtom = atom(true);

import { atom, SetStateAction } from "jotai";

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

// options

export const showGrayAtom = atom(true);

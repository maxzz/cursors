import { atom } from "jotai";

// canvas

export const orgImgAtom = atom<HTMLImageElement | null>(null);

const _canvasAtom = atom<HTMLCanvasElement | null>(null);
export const canvasAtom = atom(
    (get) => get(_canvasAtom),
    (get, set, value: HTMLCanvasElement | null) => {
        set(_canvasAtom, value);
    }
);
export const canvasCtxAtom = atom<CanvasRenderingContext2D | null>(null);

// options

export const showGrayAtom = atom(true);

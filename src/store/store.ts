import { atom } from "jotai";

// canvas

export const orgImgAtom = atom<HTMLImageElement | null>(null);
export const canvasAtom = atom<HTMLCanvasElement | null>(null);
export const canvasCtxAtom = atom<CanvasRenderingContext2D | null>(null);

// options

export const showGrayAtom = atom(true);

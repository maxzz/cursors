import { atom, Getter, PrimitiveAtom, SetStateAction, Setter } from "jotai";

// source image

export const orgImgAtom = atom<HTMLImageElement | null>(null);

// canvas body

export type CanvasElCtx = {
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};

export type CanvasBodyAtomType = typeof canvasElCtxSrcAtom;

function atomCanvasUpdate(get: Getter, set: Setter, value: SetStateAction<HTMLCanvasElement | null | undefined>, atomToSet: PrimitiveAtom<CanvasElCtx | null | undefined>) {
    let newBody: CanvasElCtx | null | undefined;
    if (value) {
        let el = typeof value === 'function' ? value(get(atomToSet)?.el) : value;
        let ctx = value && el?.getContext('2d', { willReadFrequently: true });
        newBody = el && ctx && { el, ctx, };
    }
    set(atomToSet, newBody);
}

const _canvasElCtxSrcAtom = atom<CanvasElCtx | null | undefined>(null);
export const canvasElCtxSrcAtom = atom(
    (get) => get(_canvasElCtxSrcAtom),
    (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => ((atom) => atomCanvasUpdate(get, set, value, atom))(_canvasElCtxSrcAtom)
);

const _canvasElCtxDstAtom = atom<CanvasElCtx | null | undefined>(null);
export const canvasElCtxDstAtom = atom(
    (get) => get(_canvasElCtxDstAtom),
    (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => ((atom) => atomCanvasUpdate(get, set, value, atom))(_canvasElCtxDstAtom)
);

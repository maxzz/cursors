import { atom, Getter, PrimitiveAtom, SetStateAction, Setter } from "jotai";

// source image

export const orgImgAtom = atom<HTMLImageElement | null>(null);

// canvas body

export type CanvasBody = {
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};

export type CanvasBodyAtomType = typeof canvasBodySrcAtom;

function atomCanvasUpdate(get: Getter, set: Setter, value: SetStateAction<HTMLCanvasElement | null | undefined>, atomToSet: PrimitiveAtom<CanvasBody | null | undefined>) {
    let newBody: CanvasBody | null | undefined;
    if (value) {
        let el = typeof value === 'function' ? value(get(atomToSet)?.el) : value;
        let ctx = value && el?.getContext('2d', { willReadFrequently: true });
        newBody = el && ctx && { el, ctx, };
    }
    set(atomToSet, newBody);
}

const _canvasBodySrcAtom = atom<CanvasBody | null | undefined>(null);
export const canvasBodySrcAtom = atom(
    (get) => get(_canvasBodySrcAtom),
    (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => ((atom) => atomCanvasUpdate(get, set, value, atom))(_canvasBodySrcAtom)
);

const _canvasBodyDstAtom = atom<CanvasBody | null | undefined>(null);
export const canvasBodyDstAtom = atom(
    (get) => get(_canvasBodyDstAtom),
    (get, set, value: SetStateAction<HTMLCanvasElement | null | undefined>) => ((atom) => atomCanvasUpdate(get, set, value, atom))(_canvasBodyDstAtom)
);

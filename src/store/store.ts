import { atom, Getter, PrimitiveAtom, SetStateAction, Setter } from "jotai";
import { atomWithCallback } from "../hooks/atomsX";
import { debounce } from "../utils/debounce";

export type ViewPoint = { x: number; y: number; };
export type ViewSize = { w: number; h: number; };
export type ViewBox = ViewPoint & ViewSize;

//#region LocalStorage

namespace Storage {
    const KEY = 'react-cursors-01';

    type Store = {
        showHelpId: number | null;
    };

    export let initialData: Store = {
        showHelpId: null,
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = { ...initialData, ...obj };
            } catch (error) {
            }
        }
    }
    load();

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: Store = {
            showHelpId: get(showHelpIdAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => saveDebounced(get);
}

//#endregion LocalStorage

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

// options

export const showGrayAtom = atom(true);
export const showHelpIdAtom = atomWithCallback<number | null>(Storage.initialData.showHelpId, Storage.save);

// cursor dementions

export const imageRectAtom = atom<ViewBox | null>(null); // left: rect inside source canvas to use for cursor

export const cursorSizeAtom = atom(32); // right i.e. destination
export const cursorRectAtom = atom<ViewBox | null>(null);

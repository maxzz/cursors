import { atomWithCallback } from "@/hooks/atomsX";
import { atom } from "jotai";
import { stateInitials } from "./storage/state-initials";
import { StorageSave } from "./storage/local-storage-save";

export type ViewPoint = { x: number; y: number; };
export type ViewSize = { w: number; h: number; };
export type ViewBox = ViewPoint & ViewSize;

// options

export const showGrayAtom = atom(true);
export const showHelpIdAtom = atomWithCallback<number | null>(stateInitials.showHelpId, StorageSave.save);

// cursor dementions

export const imageRectAtom = atom<ViewBox | null>(null); // left: rect inside source canvas to use for cursor

export const cursorSizeAtom = atom(32); // right i.e. destination
export const cursorRectAtom = atom<ViewBox | null>(null);

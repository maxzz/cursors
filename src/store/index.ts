import { atom, Getter, PrimitiveAtom, SetStateAction, Setter } from "jotai";
import { atomWithCallback } from "../hooks/atomsX";
import { debounce } from "../utils/debounce";

export * from './canvas-body';
export * from './ui-options';

export { AppStorage } from "./storage/local-storage-load";
export { StorageSave } from "./storage/local-storage-save";

//#region LocalStorage

// namespace Storage {
//     const KEY = 'react-cursors-01';

//     type Store = {
//         showHelpId: number | null;
//     };

//     export let initialData: Store = {
//         showHelpId: null,
//     };

//     function load() {
//         const s = localStorage.getItem(KEY);
//         if (s) {
//             try {
//                 let obj = JSON.parse(s) as Store;
//                 initialData = { ...initialData, ...obj };
//             } catch (error) {
//             }
//         }
//     }
//     load();

//     export const saveDebounced = debounce(function _save(get: Getter) {
//         let newStore: Store = {
//             showHelpId: get(showHelpIdAtom),
//         };
//         localStorage.setItem(KEY, JSON.stringify(newStore));
//     }, 1000);

//     export const save = ({ get }: { get: Getter; }) => saveDebounced(get);
// }

//#endregion LocalStorage


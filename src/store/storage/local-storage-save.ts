import { Getter } from "jotai";
import { debounce } from "@/utils/debounce";
import { StoreType, STORE_KEY } from "./state-initials";
import { stateToStore } from "./state-to-store";

export namespace StorageSave {

    export const saveDebounced = debounce(function _save(get: Getter) {
        const newStore: StoreType = stateToStore(get);
        localStorage.setItem(STORE_KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => saveDebounced(get);
}

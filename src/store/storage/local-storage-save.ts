import { Getter } from "jotai";
import { debounce } from "@/utils/debounce";
import { showHelpIdAtom } from "../ui-options";
import { AppStorage } from "@/store/storage/local-storage-load";

export namespace StorageSave {

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: AppStorage.Store = {
            showHelpId: get(showHelpIdAtom),
        };
        localStorage.setItem(AppStorage.KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => saveDebounced(get);
}

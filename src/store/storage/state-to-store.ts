import { Getter } from "jotai";
import { StoreType } from "./state-initials";
import { showHelpIdAtom } from "../ui-options";

export function stateToStore(get: Getter) {
    const newStore: StoreType = {
        showHelpId: get(showHelpIdAtom),
    };
    return newStore;
}

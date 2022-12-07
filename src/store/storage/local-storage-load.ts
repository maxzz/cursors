import { setStateInitials, stateInitials, StoreType, STORE_KEY } from "./state-initials";

export namespace AppStorage {
    function load() {
        const s = localStorage.getItem(STORE_KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as StoreType;
                setStateInitials({ ...stateInitials, ...obj });
            } catch (error) {
            }
        }
    }
    load();
}

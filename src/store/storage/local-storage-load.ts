export namespace AppStorage {
    export const KEY = 'react-cursors-01';

    export type Store = {
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
}

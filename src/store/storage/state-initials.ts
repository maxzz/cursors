export const STORE_KEY = 'react-cursors-01';

export type StoreType = {
    showHelpId: number | null;
};

export let stateInitials: StoreType = {
    showHelpId: null,
};

export function setStateInitials(_storeInitials: StoreType) {
    stateInitials = _storeInitials;
}
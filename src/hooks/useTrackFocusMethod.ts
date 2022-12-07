import { useEffect, useRef } from "react";

export function trackFocusMethod() { //https://github.com/jakearchibald/svgomg/blob/main/src/js/page/utils.js
    let focusMethod = 'mouse';

    document.body.addEventListener(
        'focus', (event: FocusEvent) => (event.target as HTMLElement)?.classList.add(focusMethod === 'key' ? 'key-focused' : 'mouse-focused'), true,
    );

    document.body.addEventListener(
        'blur', (event: FocusEvent) => (event.target as HTMLElement)?.classList.remove('key-focused', 'mouse-focused'), true,
    );

    document.body.addEventListener('keydown', () => focusMethod = 'key', true,);
    document.body.addEventListener('mousedown', () => focusMethod = 'mouse', true,);
}

export function useTrackFocusMethod() {
    const focusMethodRef = useRef('mouse');

    useEffect(() => {
        function _onFocus(event: FocusEvent) {
            (event.target as HTMLElement)?.classList.add(focusMethodRef.current === 'key' ? 'key-focused' : 'mouse-focused');
        }
        function _onBlur(event: FocusEvent) {
            (event.target as HTMLElement)?.classList.remove('key-focused', 'mouse-focused');
        }
        function _onKeyDown() {
            focusMethodRef.current = 'key';
        }
        function _onMouseDown() {
            focusMethodRef.current = 'mouse';
        }

        const a = document.addEventListener;
        a('focus', _onFocus, true);
        a('blur', _onBlur, true);
        a('keydown', _onKeyDown, true);
        a('mousedown', _onMouseDown, true);

        return () => {
            const r = document.removeEventListener;
            r('focus', _onFocus);
            r('blur', _onBlur);
            r('keydown', _onKeyDown);
            r('mousedown', _onMouseDown);
        };
    }, []);
}

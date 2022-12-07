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

        document.addEventListener('focus', _onFocus, true);
        document.addEventListener('blur', _onBlur, true);
        document.addEventListener('keydown', _onKeyDown, true);
        document.addEventListener('mousedown', _onMouseDown, true);

        return () => {
            document.removeEventListener('focus', _onFocus);
            document.removeEventListener('blur', _onBlur);
            document.removeEventListener('keydown', _onKeyDown);
            document.removeEventListener('mousedown', _onMouseDown);
        };
    }, []);
}

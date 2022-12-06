//https://github.com/jakearchibald/svgomg/blob/main/src/js/page/utils.js

export function trackFocusMethod() {
    let focusMethod = 'mouse';

    document.body.addEventListener(
        'focus', (event: FocusEvent) => (event.target as HTMLElement)?.classList.add(focusMethod === 'key' ? 'key-focused' : 'mouse-focused'), true,
    );

    document.body.addEventListener(
        'blur', (event: FocusEvent) => (event.target as HTMLElement)?.classList.remove('key-focused', 'mouse-focused'), true,
    );

    document.body.addEventListener(
        'keydown', () => focusMethod = 'key', true,
    );

    document.body.addEventListener(
        'mousedown', () => focusMethod = 'mouse', true,
    );
}

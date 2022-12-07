//https://github.com/jakearchibald/svgomg/blob/main/src/js/page/utils.js

function transitionClassFunc({ removeClass = false } = {}) {
    return <T extends HTMLElement>(element: T, className = 'active', transitionClass = 'transition'): Promise<void> => {
        const hasClass = element.classList.contains(className);

        if (removeClass) {
            if (!hasClass) return Promise.resolve();
        } else if (hasClass) {
            return Promise.resolve();
        }

        const transitionEnd = new Promise<void>((resolve) => {

            const listener = (event: TransitionEvent) => {
                if (event.target !== element) { return; }
                element.removeEventListener('transitionend', listener);
                element.classList.remove(transitionClass);
                resolve();
            };

            element.classList.add(transitionClass);

            requestAnimationFrame(() => {
                element.addEventListener('transitionend', listener);
                element.classList[removeClass ? 'remove' : 'add'](className);
            });
        });

        const transitionTimeout = new Promise<void>((resolve) => {
            setTimeout(resolve, 1000);
        });

        return Promise.race([transitionEnd, transitionTimeout]);
    };
}

export const transitionToClass = transitionClassFunc();
export const transitionFromClass = transitionClassFunc({ removeClass: true });

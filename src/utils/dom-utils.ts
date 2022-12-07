//https://github.com/jakearchibald/svgomg/blob/main/src/js/page/utils.js

export const domReady = new Promise<void>((resolve) => {

    function checkState() {
        if (document.readyState !== 'loading') resolve();
    }

    document.addEventListener('readystatechange', checkState);
    checkState();
});

const range = document.createRange();
range.selectNode(document.documentElement);

export function strToEl(str: string) {
    return range.createContextualFragment(String(str)).children[0];
}

const entityMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
};

export function escapeHTML(str: string) {
    return String(str).replace(/[&<>"'/]/g, (s) => entityMap[s]);
}

export function escapeHtmlTag(strings: string[], ...values: string[]) {
    values = values.map((s) => escapeHTML(s));
    return strings.reduce((str, val, i) => str + val + (values[i] || ''), '');
}

export function readFileAsText(file: File): Promise<string> {
    return new Response(file).text();
}

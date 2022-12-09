export function loadFileData(file: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to load file'));
        reader.readAsDataURL(file); ////reader.readAsText(file);
    });
}

export function createImageFromBlob(data: string | ArrayBuffer | null) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        if (!data || !img) {
            reject();
        } else {
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(new Error('Failed to create image'));
            img.src = data.toString();
        }
    });
}

/*
// const lines = reader.result.split('\n').map(function (line) { return line.split(','); }); console.log(lines);

canvas.toDataURL()
const csvfile = new Blob(['one,two,three'], { type: 'text/csv' })

canvas.toBlob(function (blob) {
    if (!blob) {
        return;
    }

    const form = new FormData();
    form.append('image', blob, 'moody.jpg');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/imageupload', true);
    xhr.send(form);
});
*/

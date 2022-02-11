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

export function drawImage(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // context.beginPath();
    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(img, 0, 0);
}

export function convertToGray(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data: Uint8ClampedArray = imageData.data;
    for (var i = 0; i <= data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    context.putImageData(imageData, 0, 0);
}

export function applyXOR(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, hexColor: string) {

    const color = hexColor.match(/(\d\d)/g);
    if (!color || color.length !== 3) {
        throw new Error('invalid color');
    }

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data: Uint8ClampedArray = imageData.data;
    for (var i = 0; i <= data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = 0; //r
        data[i + 1] = 256; //g
        data[i + 2] = 0; //b
    }
    context.putImageData(imageData, 0, 0);
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

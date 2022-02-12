import { CanvasBody } from "../store/store";

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

export function drawImage(body: CanvasBody, img: HTMLImageElement) {
    // body.ctx.clearRect(0, 0, body.el.width, body.el.height);
    // body.ctx.beginPath();
    body.ctx.fillStyle = 'red';
    body.ctx.fillRect(0, 0, body.el.width, body.el.height);

    body.ctx.drawImage(img, 0, 0);
}

export function convertToGray(body: CanvasBody) {
    const imageData = body.ctx.getImageData(0, 0, body.el.width, body.el.height);
    const data: Uint8ClampedArray = imageData.data;
    for (var i = 0; i <= data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    body.ctx.putImageData(imageData, 0, 0);
}

const enum RGB {
    r = 0,
    g = 1,
    b = 2,
}

export function applyXOR(body: CanvasBody, hexColor: string) {

    const color = hexColor.match(/([a-fA-F\d]{2})/g);
    if (!color || color.length !== 3) {
        throw new Error('invalid color');
    }

    const imageData = body.ctx.getImageData(0, 0, body.el.width, body.el.height);
    const data: Uint8ClampedArray = imageData.data;

    const cc = [data[length-4], data[length-3], data[length-2]];

    for (var i = 0; i <= data.length; i += 4) {
        //data[i    ] = 0xff; //r
        data[i + 1] = +cc[1]; //g
        data[i + 2] = data[i + 2] ^ +cc[2]; //b

        // data[i    ] = +cc[0]; //r
        // data[i + 1] = +cc[1]; //g
        // data[i + 2] = +cc[2]; //b

        // data[i    ] = data[i    ] ^ +cc[0]; //r
        // data[i + 1] = data[i + 1] ^ +cc[1]; //g
        // data[i + 2] = data[i + 2] ^ +cc[2]; //b

        // data[i    ] = data[i    ] ^ +color[0]; //r
        // data[i + 1] = data[i + 1] ^ +color[1]; //g
        // data[i + 2] = data[i + 2] ^ +color[2]; //b
    }
    body.ctx.putImageData(imageData, 0, 0);
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

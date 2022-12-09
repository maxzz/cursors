import { CanvasElCtx } from "@/store";

export function drawImage(elCtx: CanvasElCtx, img: HTMLImageElement) {
    // body.ctx.clearRect(0, 0, body.el.width, body.el.height);
    // body.ctx.beginPath();
    elCtx.ctx.fillStyle = 'red';
    elCtx.ctx.fillRect(0, 0, elCtx.el.width, elCtx.el.height);

    elCtx.ctx.drawImage(img, 0, 0);
}

export function convertToGray(elCtx: CanvasElCtx) {
    const imageData = elCtx.ctx.getImageData(0, 0, elCtx.el.width, elCtx.el.height);
    const data: Uint8ClampedArray = imageData.data;
    for (var i = 0; i <= data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    elCtx.ctx.putImageData(imageData, 0, 0);
}

const enum RGB {
    r = 0,
    g = 1,
    b = 2,
}

export function applyXOR(elCtx: CanvasElCtx, hexColor: string) {

    const color = hexColor.match(/([a-fA-F\d]{2})/g);
    if (!color || color.length !== 3) {
        throw new Error('invalid color');
    }

    const imageData = elCtx.ctx.getImageData(0, 0, elCtx.el.width, elCtx.el.height);
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
    elCtx.ctx.putImageData(imageData, 0, 0);
}

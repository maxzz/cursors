import { useAtom } from "jotai";
import { RefObject, useEffect, useRef, useState } from "react";
import { orgImgAtom } from "../store/store";
import { toastWarning } from "./UI/UiToaster";

function loadImage(reader: FileReader, canvasRef: RefObject<HTMLCanvasElement>) {
    // const lines = reader.result.split('\n').map(function (line) { return line.split(','); }); console.log(lines);
    if (!reader.result || !canvasRef.current) {
        return;
    }

    try {
        const img = new Image();
        if (!img) {
            return;
        }

        img.onload = function () {
            //const canvas = document.createElement('canvas');
            const canvas = canvasRef.current;
            if (!canvas) {
                return;
            }
            const context = canvas.getContext('2d');
            if (!context) {
                return;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();

            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (var i = 0; i <= data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }
            context.putImageData(imageData, 0, 0);

            //document.body.appendChild(canvas);

            //canvas.toDataURL()
            //const csvfile = new Blob(['one,two,three'], { type: 'text/csv' })

            /*
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
        };

        img.src = reader.result.toString();
        //document.body.appendChild(img)

    } catch (error) {

    }
}

function createImageFromBlob(data: string | ArrayBuffer | null) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        if (!data || !img) {
            reject();
        } else {
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = data.toString();
        }
    });
}

function loadFileData(file: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject();
        reader.readAsDataURL(file); ////reader.readAsText(file);
    });
}

function drawImage(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // context.beginPath();
    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(img, 0, 0);
}

function convertToGray(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i <= data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    context.putImageData(imageData, 0, 0);
}

export function DropZone() {
    const inputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dropActive, setDropActive] = useState(false);

    const [orgImg, setOrgImg] = useAtom(orgImgAtom);

    async function handleDrop(files: FileList, canvasRef: RefObject<HTMLCanvasElement>) {
        if (!canvasRef.current) { return; }
        try {
            const blob = await loadFileData(files[0]);
            const img: HTMLImageElement = await createImageFromBlob(blob);
            setOrgImg(img);

            // const canvas = canvasRef.current;
            // const context = canvas?.getContext('2d');
            // if (!canvas || !context) {
            //     return;
            // }

            // drawImage(context, canvas, img);
            // convertToGray(context, canvas);
        } catch (error) {
            setOrgImg(null);
            toastWarning(`failed to load image ${(error as Error)?.message}}`);
            console.log('failed to load image', error);
        }
    }

    useEffect(() => {
        if (!canvasRef.current) { return; }
        async function handleIngChange() {
            try {
                const canvas = canvasRef.current;
                const context = canvas?.getContext('2d');
                if (!canvas || !context) {
                    return;
                }
                if (orgImg) {
                    drawImage(context, canvas, orgImg);
                }
                convertToGray(context, canvas);
            } catch (error) {
                toastWarning(`failed to render image`);
                console.log('failed to render image', error);
            }
        }
        handleIngChange();
    }, [orgImg]);

    return (
        <>
            <label
                className={`w-32 h-16 inline-block border-slate-500 border rounded ${dropActive ? 'bg-pink-400' : 'bg-slate-400'}`}
                onDragOver={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    !dropActive && setDropActive(true);
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setDropActive(false);
                    handleDrop(event.dataTransfer.files, canvasRef);
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept='.png'
                    className="hidden"
                    onChange={(event) => inputRef.current?.files && handleDrop(inputRef.current?.files, canvasRef)}
                />
            </label>
            <canvas ref={canvasRef} className="bg-slate-300" />
            {/* <canvas ref={canvasRef} className="w-40 h-32 bg-slate-300" /> */}
        </>
    );
}

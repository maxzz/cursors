import { useRef, useState } from 'react';
import './App.css';

function loadImage(reader: FileReader) {
    // const lines = reader.result.split('\n').map(function (line) { return line.split(','); }); console.log(lines);
    if (!reader.result) {
        return;
    }
    try {
        const img = new Image();
        if (!img) {
            return;
        }

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) {
                return;
            }
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

            document.body.appendChild(canvas);

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

function handleDrop(files: FileList) {
    console.log('onDrop', files);

    const reader = new FileReader();
    reader.onload = () => loadImage(reader);

    //reader.readAsText(files[0])
    reader.readAsDataURL(files[0]);

}

function DropZone() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropActive, setDropActive] = useState(false);
    return (
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
                handleDrop(event.dataTransfer.files);
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept='.png'
                className="hidden"
                onChange={(event) => inputRef.current?.files && handleDrop(inputRef.current?.files)}
            />
        </label>
    );
}

function App() {
    return (
        <div className="h-screen bg-purple-200 p-4">
            <DropZone />
        </div>
    );
}

export default App;

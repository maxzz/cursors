import { useRef, useState } from 'react';
import './App.css';

function DropZone() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropActive, setDropActive] = useState(false);
    return (
        <label
            className={`w-32 h-16 inline-block border-slate-500 border rounded ${dropActive ? 'bg-pink-400' : 'bg-slate-400'}`}
            onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();

                console.log('onDragOver');
                setDropActive(true);
            }}
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                console.log('onDrop', event.dataTransfer.files);
                setDropActive(false);
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept='.png'
                className={`w-full h-full hidden`}
                onChange={(event) => {
                    console.log('change', inputRef.current, inputRef.current?.files);
                    setDropActive(false);
                }}
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

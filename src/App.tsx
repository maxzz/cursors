import './App.css';
import { DropZone } from './components/DropZone';
import { UIToaster } from './components/UI/UiToaster';

function App() {
    return (
        <>
            <UIToaster />
            <div className="h-screen bg-purple-200 p-4">
                <DropZone />
            </div>
        </>
    );
}

export default App;

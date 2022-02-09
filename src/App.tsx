import { DropZone } from './components/DropZone';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';

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

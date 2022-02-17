import React from 'react';
import { AppCanvas } from './components/AppCanvas';
import { UIToaster } from './components/UI/UiToaster';
import { Dialogs } from './components/Dialogs';
import './App.css';

function App() {
    return (<>
        <UIToaster />
        <div className="h-screen bg-sky-700 p-4">
            <AppCanvas />
        </div>
        <Dialogs />
    </>);
}

export default App;

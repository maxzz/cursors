import React from 'react';
import { AppCanvas } from './components/Section2_Main/AppCanvas';
import { UIToaster } from './components/UI/UiToaster';
import { Dialogs } from './components/Dialogs';
import './App.css';

function App() {
    return (<>
        <UIToaster />
        <div className="h-screen bg-white bg-gradient-to-t from-sky-700/70 via-sky-700/50 to-sky-700/70 p-4">
            <AppCanvas />
        </div>
        <Dialogs />
    </>);
}

export default App;

import React from 'react';
import { AppCanvas } from './components/AppCanvas';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';
import Dialogs from './components/Dialogs';

function App() {
    return (
        <>
            <UIToaster />
            <div className="h-screen bg-purple-200 p-4">
                <AppCanvas />
            </div>
            <Dialogs />
        </>
    );
}

export default App;

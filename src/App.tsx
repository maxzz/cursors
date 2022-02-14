import React from 'react';
import { AppCanvas } from './components/AppCanvas';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';

function App() {
    return (
        <>
            <UIToaster />
            <div className="h-screen bg-purple-200 p-4">
                <AppCanvas />
            </div>
        </>
    );
}

export default App;

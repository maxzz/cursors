import React from 'react';
import { AppCanvas } from './components/AppCanvas';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';
import {defaultTheme, Provider} from '@adobe/react-spectrum';

function App() {
    return (
        <>
            <Provider theme={defaultTheme}>
                <UIToaster />
                <div className="h-screen bg-purple-200 p-4">
                    <AppCanvas />
                </div>
            </Provider>
        </>
    );
}

export default App;

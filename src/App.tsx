import React from 'react';
import { UIToaster } from './components/UI/UiToaster';
import { Dialogs } from './components/Section7_Dialogs';
import { DropArea } from '@ui/UIDropArea';
import './App.css';
import { Section1_Header } from './components/Section1_Header';
import { Section2_Main } from './components/Section2_Main';

function App() {
    return (<>
        <UIToaster />
        <div className="relative h-screen bg-white bg-gradient-to-t from-sky-700/70 via-sky-700/50 to-sky-700/70">
            <div className="h-full flex flex-col">
                <Section1_Header />
                <Section2_Main className="flex-1" />
            </div>
            <DropArea />
        </div>
        <Dialogs />
    </>);
}

export default App;

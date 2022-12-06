import React from 'react';
import { Section2_Main } from './components/Section2_Main';
import { UIToaster } from './components/UI/UiToaster';
import { Dialogs } from './components/Section7_Dialogs';
import { Mount } from '@ui/TestTransitions'; // test transitions
import './App.css';
import { DropZone2 } from '@ui/UIDropContainer';

function App() {
    return (<>
        <UIToaster />
        <div className="h-screen bg-white bg-gradient-to-t from-sky-700/70 via-sky-700/50 to-sky-700/70 p-4">
            <div className="relative h-full flex flex-col">
                {/* <Mount /> */}
                <DropZone2 />
                <Section2_Main />
            </div>
        </div>
        <Dialogs />
    </>);
}

export default App;

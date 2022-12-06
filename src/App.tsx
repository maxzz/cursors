import React from 'react';
import { Section2_Main } from './components/Section2_Main';
import { UIToaster } from './components/UI/UiToaster';
import { Dialogs } from './components/Section7_Dialogs';
import { Mount } from '@ui/TestTransitions'; // test transitions
import { DropArea } from '@ui/UIDropArea';
import './App.css';

function App() {
    return (<>
        <UIToaster />
        <div className="relative h-screen bg-white bg-gradient-to-t from-sky-700/70 via-sky-700/50 to-sky-700/70">
            <div className="p-4 h-full flex flex-col">
                {/* <Mount /> */}
                <Section2_Main />
            </div>
            <DropArea />
        </div>
        <Dialogs />
    </>);
}

export default App;

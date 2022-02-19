import React from 'react';

function CursorTester() {
    return (
        <div className="">
            <div className="mx-auto py-4 w-max">Click on the square to check the cursor</div>
            <div className="flex items-center justify-center gap-x-4">
                <div className="w-36 h-36 bg-white"></div>
                <div className="w-36 h-36 bg-black"></div>
            </div>
        </div>
    );
}

export default CursorTester;
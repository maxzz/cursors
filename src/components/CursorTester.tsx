import React from 'react';

function CursorTester() {
    return (
        <div className="flex justify-center">
            <div className="bg-slate-300 border-slate-300 rounded-3xl border-[16px]">
                <div className="p-4 bg-slate-900 border-slate-400 rounded-[12px] border-8">
                    <div className="mx-auto w-max text-green-500">Hover over the square to check the cursor</div>
                    <div className="pt-4 flex items-center justify-center gap-x-4">
                        <div className="w-36 h-36 bg-white border-slate-900 border"></div>
                        <div className="w-36 h-36 bg-black border-slate-500 border"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CursorTester;
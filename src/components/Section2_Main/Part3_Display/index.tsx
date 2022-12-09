import React from 'react';

export function Part3_Display() { //CursorTester
    return (
        <div className="min-h-[400px] flex justify-center">
            <div className="bg-slate-300 border-b-slate-400/30 border-r-slate-400/30 border-slate-300 rounded-3xl border-[16px]">
                <div className="p-4 bg-slate-900 border-t-slate-400/90 border-l-slate-400/90 rounded-[12px] border-8">

                    <div className="flex items-center justify-center gap-x-4">
                        <div className="w-36 h-36 bg-white border-slate-900 border"></div>
                        <div className="w-36 h-36 bg-black border-slate-500 border"></div>
                    </div>

                    <div className="pt-2 w-max font-mono text-xs text-green-500">
                        * Hover over the square to check the cursor
                    </div>

                </div>
            </div>
        </div>
    );
}

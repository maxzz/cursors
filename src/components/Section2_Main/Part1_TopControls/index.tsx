import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { orgImgAtom, showGrayAtom } from '@/store';
import { classNames } from '@/utils/classnames';
import { CursorSizeSelector } from './CursorSizeSelector';

function CheckBoxShowGraySrcCanvas({ className, ...rest }: React.HTMLAttributes<HTMLLabelElement>) {
    const [showGray, setShowGray] = useAtom(showGrayAtom);
    return (
        <label className={classNames("flex items-center space-x-1.5 select-none", className)} {...rest}>
            <input
                className="w-5 h-5 form-checkbox text-sky-700 bg-sky-200 focus:ring-sky-700 focus:ring-offset-sky-200 focus:ring-offset-1 rounded"
                type="checkbox"
                checked={showGray}
                onChange={(e) => setShowGray(e.target.checked)}
            />
            <div className="text-sky-900">Show source image as gray</div>
        </label>
    );
}

export function Part1_TopControls() {
    const orgImg = useAtomValue(orgImgAtom);
    return (
        <div className="flex flex-col space-y-2">
            {/* info trigger */}

            <div className="flex items-center space-x-2">
                <CursorSizeSelector />
                {orgImg && <CheckBoxShowGraySrcCanvas />}
            </div>
        </div>
    );
}

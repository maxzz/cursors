import { useSetAtom } from "jotai";
import { showHelpIdAtom } from "@/store";
import { classNames } from "@/utils/classnames";
// import { Mount } from '@ui/TestTransitions'; // test transitions
// import { DropZone } from "@/components/Section2_Main/Part1_TopControls/DropZone";

function InfoTrigger({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    const showHelp = useSetAtom(showHelpIdAtom);
    return (
        <div
            className={classNames("w-6 h-6 pt-px text-sm text-center font-bold font-serif text-slate-700 bg-slate-300 border-slate-500 border rounded-md active:scale-[.97] cursor-pointer", className)}
            title="info"
            onClick={() => showHelp(1)}
            {...rest}
        >
            i
        </div>
    );
}

export function Section1_Header() {
    return (
        <div className="h-32 self-center flex space-x-2">
            {/* <DropZone /> */}
            {/* <Mount /> */}
            <div className="flex flex-col justify-between">
                <InfoTrigger />
            </div>
        </div>
    );
}

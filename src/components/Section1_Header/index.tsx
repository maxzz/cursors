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
        <div className="p-4 flex space-x-2 justify-between shadow">
            {/* <DropZone /> */}
            {/* <Mount /> */}
            <div className="text-2xl text-sky-100 uppercase tracking-tighter" style={{WebkitTextStroke: '.2px blue'}}>Web cursors playground</div>
            <InfoTrigger />
        </div>
    );
}

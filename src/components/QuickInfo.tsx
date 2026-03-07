type QuickInfoProps = {
    label: string;
    info: string;
}

export const QuickInfo = (props: QuickInfoProps) => {
    return (
        <div className="flex flex-col gap-2 items-start rounded-xl border border-Neutral-600 bg-Neutral-800 p-4">
            <span className="text-md font-dmSans text-Neutral-300">{props.label}</span>
            <span className="text-3xl font-dmSans text-Neutral-0">{props.info}</span>
        </div>
    );
}
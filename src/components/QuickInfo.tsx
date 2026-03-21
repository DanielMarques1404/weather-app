import { useUnitContext } from "../app/hooks/useUnitContext";

type QuickInfoProps = {
    label: string;
    info?: number;
    kind: "temperature" | "windSpeed" | "humidity" | "precipitation"
}

export const QuickInfo = (props: QuickInfoProps) => {
    const {unit} = useUnitContext()

    const getUnit = () => {
        switch (props.kind) {
            case "temperature":
                return "°"
            case "humidity":
                return "%"
            case "windSpeed":
                return unit.windSpeed
            case "precipitation":
                return unit.precipitation_short
            default:
                return "";
        }
    }
    
    return (
        <div className="flex flex-col gap-2 items-start rounded-xl border border-Neutral-600 bg-Neutral-800 p-4">
            <span className="text-md font-dmSans text-Neutral-300">{props.label}</span>
            <span className="text-3xl font-dmSans text-Neutral-0">{`${typeof props.info === 'number' ? Math.floor(props.info) + getUnit() : "-"}`}</span>
        </div>
    );
}
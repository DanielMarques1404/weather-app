import { useUnitContext } from "../../app/hooks/useUnitContext";

type SimpleCardProps = {
    label: string;
    info: number | undefined;
    kind: "temperature" | "windSpeed" | "humidity" | "precipitation";
    isLoading: boolean;
}

export const SimpleCard = (props: SimpleCardProps) => {
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
            <span className="text-3xl font-dmSans text-Neutral-0">{`${props.isLoading ? "-" : Math.floor(props.info!) + getUnit()}`}</span>
        </div>
    );
}
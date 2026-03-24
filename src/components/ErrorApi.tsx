export const ErrorApi = ({onclick}: {onclick: () => void}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 m-4">
            <img className="w-8 h-8" src="/assets/images/icon-error.svg" alt="API error icon" />
            <h1 className="font-dmSans text-Neutral-0">Something went wrong</h1>
            <span className="text-sm text-Neutral-0">We coudn't connect to the server (API error). Please try again in a few moments.</span>
            <div className="flex items-center justify-end gap-2 bg-Neutral-700 font-dmSans text-sm text-Neutral-0 px-3 py-2 cursor-pointer rounded-md" onClick={onclick}>
                <img className="w-4 h-4" src="/assets/images/icon-retry.svg" alt="icon retry" />
                <span className="text-sm text-Neutral-0">Retry</span>
            </div>
        </div>
    );
}
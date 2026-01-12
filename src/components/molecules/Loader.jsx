import Typography from "../atoms/Typography";

export default function Loader() {
    return (
        <div className="min-h-screen bg-foreground dark:bg-background flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <Typography variant="body" className="text-black dark:text-gray-400">Loading magic...</Typography>
            </div>
        </div>
    );
}
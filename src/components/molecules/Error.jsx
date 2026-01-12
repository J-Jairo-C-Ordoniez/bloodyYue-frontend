import Link from "../atoms/Link";
import Typography from "../atoms/Typography";

export default function Error({ message = 'A ocurrido un error', typeError = '500' }) {
    return (
        <div className="min-h-screen bg-foreground dark:bg-background flex items-center justify-center">
            <div className="text-center p-8 rounded-2xl">
                <Typography 
                    variant="h2" 
                    className="mb-2"
                >Oops!
                </Typography>
                
                <Typography 
                    variant="h3" 
                    className="mb-10"
                >{`${typeError} - ${message}`}
                </Typography>
                
                <Link href="/">Back to Home</Link>
            </div>
        </div>
    );
}
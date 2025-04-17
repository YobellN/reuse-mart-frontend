import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default function AlertBox({ variant, title, description }: { variant: string, title: string, description: string }) {
    return (
        <Alert variant={variant === "destructive" ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    )
}
import Icon from "../atoms/Icon";

export default function ErrorCard() {
    return (
        <div className="h-full bg-foreground dark:bg-background flex items-center justify-center border">
            <Icon name="CircleAlert" size={40} />
        </div>
    );
}
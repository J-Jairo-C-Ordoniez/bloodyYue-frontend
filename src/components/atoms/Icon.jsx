import *  as LucideIcons from "lucide-react";

export default function Icon({ name, size = 24, color = "currentColor" }) {
    const LucideIcon = LucideIcons[name];

    return LucideIcon ? <LucideIcon size={size} color={color} /> : <span>⚠️</span>;
};

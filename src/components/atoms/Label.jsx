"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "../../lib/utils"

function Label({
  className,
  color,
  style,
  ...props
}) {
  // Helper to add 20% opacity to a hex color
  const getBackgroundColor = (hex) => {
    if (!hex || !hex.startsWith('#')) return undefined;
    // Remove # and append 33 for ~20% opacity (33/255 ≈ 0.2)
    return `${hex}33`;
  };

  const finalStyle = color ? {
    color,
    borderColor: color,
    backgroundColor: getBackgroundColor(color),
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '4px 10px',
    borderRadius: '20px',
    width: 'fit-content',
    ...style
  } : style;

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      style={finalStyle}
      {...props} />
  );
}

export { Label }
export default Label

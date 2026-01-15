import React from 'react';
import Icon from './Icon';

export default function Checkbox({
    id,
    name,
    label,
    checked,
    onChange,
    className = ''
}) {
    return (
        <div className={`flex items-start gap-3 ${className}`}>
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="peer cursor-pointer appearance-none relative h-5 w-5 bg-[#1A1A1D] border border-white/10 rounded transition-all checked:border-[#6B21A8] checked:bg-[#6B21A8] hover:border-[#6B21A8]"
                />
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <Icon name="Check" size={12} />
                </div>
            </div>
            {label && (
                <label htmlFor={id} className="text-xs text-gray-400 cursor-pointer select-none">
                    {label}
                </label>
            )}
        </div>
    );
}

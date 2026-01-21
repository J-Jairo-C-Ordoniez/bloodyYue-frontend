import React, { useState } from 'react';
import Icon from './Icon';

export default function Input({
    type = 'text',
    placeholder,
    label,
    icon,
    id,
    name,
    value,
    onChange,
    className = '',
    disabled = false
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-200">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon name={icon} size={18} color="#6B7280" />
                    </div>
                )}

                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    disabled={disabled}
                    className={`
                        w-full px-4 py-3 bg-[#1A1A1D] border border-white/10 rounded-lg 
                        text-white placeholder-gray-500 outline-none transition-all duration-300
                        focus:border-[#6B21A8] focus:ring-1 focus:ring-[#6B21A8]
                        ${icon ? 'pl-10' : ''}
                        ${isPassword ? 'pr-12' : ''}
                    `}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                        {showPassword ? (
                            <Icon name="EyeOff" size={18} />
                        ) : (
                            <Icon name="Eye" size={18} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

import { useRef, useEffect } from 'react';

export default function OtpInput({ length = 6, value, onChange }) {
    const inputs = useRef([]);

    useEffect(() => {
        if (inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, []);

    const handleChange = (e, index) => {
        const { value: val } = e.target;

        if (isNaN(val)) return;

        const newOtp = value.split('');
        newOtp[index] = val.substring(val.length - 1);
        onChange(newOtp.join(''));

        if (val && index < length - 1 && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !value[index] && index > 0 && inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        if (/^\d+$/.test(pastedData)) {
            onChange(pastedData.padEnd(length, ''));
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            {Array.from({ length }, (_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={value[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-xl font-bold rounded-lg border border-gray-600 bg-transparent text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                />
            ))}
        </div>
    );
}

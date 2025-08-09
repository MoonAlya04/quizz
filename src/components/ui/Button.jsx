import React from 'react';
import clsx from 'clsx';

export default function Button({ children, variant = "default", onClick, className }) {
    const variants = {
        default: "bg-blue-600 hover:bg-blue-700 text-white",
        outline: "border border-gray-300 hover:bg-gray-100 text-gray-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            onClick={onClick}
            className={clsx(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                variants[variant],
                className
            )}
        >
            {children}
        </button>
    );
}

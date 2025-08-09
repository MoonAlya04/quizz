import React from 'react';
import clsx from 'clsx';

export default function Progress({ value = 0, className }) {
    return (
        <div className={clsx("w-full bg-gray-200 rounded-full h-2.5", className)}>
            <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
}

import React from 'react';
import clsx from 'clsx';

/**
 * Հիմնական Card wrapper
 */
export function Card({ children, className }) {
    return (
        <div
            className={clsx(
                "rounded-2xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700",
                className
            )}
        >
            {children}
        </div>
    );
}

/**
 * Card Header
 */
export function CardHeader({ children, className }) {
    return (
        <div className={clsx("p-4 border-b border-gray-200 dark:border-gray-700", className)}>
            {children}
        </div>
    );
}

/**
 * Card Title
 */
export function CardTitle({ children, className }) {
    return (
        <h2 className={clsx("text-lg font-bold text-gray-900 dark:text-white", className)}>
            {children}
        </h2>
    );
}

/**
 * Card Content
 */
export function CardContent({ children, className }) {
    return (
        <div className={clsx("p-4", className)}>
            {children}
        </div>
    );
}

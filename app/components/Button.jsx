"use client";
import Link from "next/link";

//Knap-størrelser med tailwind
const sizeClasses = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
};

//default visning
export default function Button({
    children,
    size = 'md',
    className = '',
    onClick,
    type = 'button',
}) {
    return (
        <button
        type={type}
        onClick={onClick}
        className={`font-bold border shadow text-white hover:bg-[var(--color-rust)] hover:border-none cursor-pointer ${sizeClasses[size]} ${className}`}
    >
        {children}
    </button>
    );
}
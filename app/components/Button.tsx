"use client";
import Link from "next/link";

//Hvad komponenten tager imod af props
type ButtonProps = {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
};

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
}: ButtonProps){
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
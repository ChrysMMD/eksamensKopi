"use client";
import Link from "next/link";

//Knap-størrelser med tailwind
const sizeClasses = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
};

//knap-varianter
const variantClasses = {
  primary: "text-white hover:bg-[var(--color-rust)] hover:border-none cursor-pointer",
  secondary: "bg-[var(--color-rust)] text-white border hover:bg-white hover:text-[var(--color-rust)]",
  outline: "bg-transparent border text-[var(--color-rust)] hover:bg-gray-100",
};

//default visning
export default function Button({
    children,
    size = 'md',
    variant= "primary",
    className = '',
    onClick,
    type = 'button',
}) {
    return (
        <button
        type={type}
        onClick={onClick}
        className={`font-bold border shadow cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
        {children}
    </button>
    );
}
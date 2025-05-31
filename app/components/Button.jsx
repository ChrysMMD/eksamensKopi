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
  primary: "text-white hover:bg-gray-300/30 cursor-pointer",
  secondary: "bg-none text-[var(--color-rust)] hover:border-[var(--color-darkgreen)] hover:text-[var(--color-darkgreen)] hover:boder-[var(--color-darkgreen)]",
  selected: "border-white bg-[var(--color-lightgreen)] text-[var(--color-offwhite)] hover:bg-[var(--color-darkgreen)]",
  unselected:"border-[var(--color-darkgreen)] text-[var(--color-darkgreen)] hover:bg-[var(--color-lightgreen)] hover:text-white hover:border-white",
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
        className={`font-bold border cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
        {children}
    </button>
    );
}
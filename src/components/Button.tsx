import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "discord";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-linear-to-r from-pink-600 to-pink-700 text-white hover:from-pink-700 hover:to-pink-800 shadow-lg hover:shadow-pink-500/50 transform hover:scale-105 border border-pink-500/50",
    secondary:
      "bg-gray-800 text-pink-100 border-2 border-pink-900/50 hover:border-pink-700 hover:bg-gray-700 shadow-lg",
    discord:
      "bg-[#5865F2] text-white hover:bg-[#4752C4] shadow-lg hover:shadow-xl transform hover:scale-105",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs md:px-4 md:text-sm",
    md: "px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base",
    lg: "px-6 py-3 text-base md:px-8 md:py-4 md:text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "auto" | "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { width: 120, height: 21 },
  md: { width: 160, height: 28 },
  lg: { width: 200, height: 35 },
  xl: { width: 280, height: 49 },
};

export function Logo({
  width,
  height,
  className = "",
  variant = "auto",
  size = "lg",
}: LogoProps) {
  const dimensions = width && height ? { width, height } : sizeMap[size];
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (variant === "auto") {
      // Check initial dark mode
      setIsDarkMode(document.documentElement.classList.contains("dark"));

      // Watch for changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });
      return () => observer.disconnect();
    }
    // Return undefined for non-auto variant (TypeScript requirement)
    return undefined;
  }, [variant]);

  const logoSrc =
    variant === "dark" || (variant === "auto" && isDarkMode)
      ? "/images/logo-dark.svg"
      : "/images/logo.svg";

  return (
    <Image
      src={logoSrc}
      alt="LIGNOVIA"
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      priority
    />
  );
}

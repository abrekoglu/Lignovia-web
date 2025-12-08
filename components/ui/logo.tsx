"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "auto" | "light" | "dark";
}

export function Logo({
  width = 200,
  height = 35,
  className = "",
  variant = "auto",
}: LogoProps) {
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
  }, [variant]);

  const logoSrc =
    variant === "dark" || (variant === "auto" && isDarkMode)
      ? "/images/logo-dark.svg"
      : "/images/logo.svg";

  return (
    <Image
      src={logoSrc}
      alt="LIGNOVIA"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}


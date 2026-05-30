"use client";
import { cn } from "@/lib/utils";
import { type ChangeEvent, useEffect, useState } from "react";

const TextInput = ({
  Icon,
  label,
  error,
  position,
  disabled,
  className,
  inputValue,
  placeholder,
  nextInputRef,
  currentInputRef,
  requiredAsterisk,
  onEnterPress,
  onChange,
  onBlur,
}: {
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  onBlur?: () => void;
  placeholder?: string;
  Icon?: React.ReactNode;
  onEnterPress?: (e: any) => void;
  requiredAsterisk?: boolean;
  position?: "left" | "right";
  inputValue?: string | number;
  onChange?: (value: string | number | any) => void;
  nextInputRef?: React.RefObject<HTMLInputElement | null>;
  currentInputRef?: React.RefObject<HTMLInputElement | null>;
}) => {
  const [value, setValue] = useState(inputValue || "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValue(inputValue || "");
  }, [inputValue]);

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterPress?.(e);
      if (nextInputRef?.current) {
        nextInputRef.current.focus();
      }
      e.currentTarget.blur();
    }
  };

  return (
    <div className={`value-input-container m-0 p-0 flex flex-col gap-2 ${className}`}>
      <label className={`${label && "gap-2"} relative flex flex-col items-start w-full`}>

        {/* Label */}
        {(label || requiredAsterisk) && (
          <div className="flex flex-row items-center text-[14px] md:text-[10px] xl:text-base">
            <p className="flex flex-row gap-2 items-center text-xs font-bold tracking-wider font-display text-white/40">
              {label}
            </p>
            {requiredAsterisk && (
              <span className="ml-0.5 text-red-500">*</span>
            )}
          </div>
        )}

        {/* Input wrapper */}
        <div className="relative w-full">
          <input
            type="text"
            value={value}
            disabled={disabled}
            onBlur={handleBlur}
            ref={currentInputRef}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              // base
              "w-full h-12 px-5 rounded-2xl outline-none transition-all duration-200 text-sm",
              "bg-white/3 text-white placeholder:text-white/25",
              "border border-white/20",
              // disabled
              "disabled:opacity-40 disabled:cursor-not-allowed",
              // error state
              error
                ? "border-red-500/50 bg-red-500/5 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                : [
                    // normal focus — green glow
                    "focus:border-primary-700",
                    "focus:bg-primary-900/30",
                    "focus:shadow-[0_0_0_3px_rgba(2,174,2,0.12)]",
                  ],
              // icon padding
              Icon && position === "left" ? "pl-11" : Icon ? "pr-11" : "",
            )}
          />

          {/* Icon */}
          {Icon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
                position === "left" ? "left-4" : "right-4",
                // icon tints green when focused, dim otherwise
                isFocused ? "text-primary-500" : "text-white/25",
              )}
            >
              {Icon}
            </div>
          )}
        </div>
      </label>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
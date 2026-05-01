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
  onEnterPress?: () => void;
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
      // 1. Call your parent-provided "onEnterPress" handler
      onEnterPress?.();
      // 2. Focus on the next input if the nextInputRef is provided
      if (nextInputRef?.current) {
        nextInputRef.current.focus();
      }

      // 2. Remove focus from the input
      e.currentTarget.blur();
    }
  };

  return (
    <div
      className={`value-input-container m-0 p-0 flex flex-col gap-2 ${className}`}
    >
      <label
        className={`${
          label && "gap-2"
        } relative flex flex-col items-start w-full`}
      >
        <div className="flex flex-row items-center text-[14px] md:text-[10px] xl:text-base">
          <p className="flex flex-row gap-2 items-center text-xs font-bold tracking-wider font-display  text-gray-500">
            {label}
          </p>
          {requiredAsterisk && (
            <span className="ml-0.5 text-red-600 text-danger-600">*</span>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="text"
            value={value}
            disabled={disabled}
            onBlur={handleBlur} // Attach the handleBlur
            ref={currentInputRef}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Listen for Enter key
            placeholder={placeholder}
            className={cn(
              "w-full h-13 px-5 rounded-2xl border-2 outline-none transition-all text-sm bg-surface-50 text-gray-900 placeholder:text-gray-400",
              error
                ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
                : "border-surface-200 focus:border-primary-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(2,174,2,0.08)]",
              Icon && position === "left" ? "pl-11" : "pr-11",
            )}
          />
          {Icon && (
            <div
              className={`${
                position === "left" ? "left-4" : "right-4"
              } absolute top-1/2 -translate-y-1/2 pointer-events-none `}
            >
              {Icon}
            </div>
          )}
        </div>
      </label>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500 inline-block shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;

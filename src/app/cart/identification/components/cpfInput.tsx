"use client";

import { forwardRef } from "react";
import { PatternFormat } from "react-number-format";

import { Input } from "@/components/ui/input";

interface CpfInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CpfInput = forwardRef<HTMLInputElement, CpfInputProps>(
  ({ value, onChange, placeholder, className, ...props }, ref) => {
    return (
      <PatternFormat
        format="###.###.###-##"
        mask="_"
        value={value}
        onValueChange={(values) => {
          onChange?.(values.formattedValue);
        }}
        customInput={Input}
        placeholder={placeholder}
        className={className}
        getInputRef={ref}
        {...props}
      />
    );
  },
);

CpfInput.displayName = "CpfInput";

export default CpfInput;

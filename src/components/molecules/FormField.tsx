"use client";

import { InputHTMLAttributes } from "react";
import { Input } from "@/components/atoms";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormField({ label, error, ...rest }: FormFieldProps) {
  return <Input label={label} error={error} {...rest} />;
}

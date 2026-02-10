"use client";

import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<any>;
  error?: string;
  watchValue?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  placeholder,
  options,
  register,
  setValue,
  error,
  watchValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync selectedValue with form value
  useEffect(() => {
    if (watchValue) {
      setSelectedValue(watchValue);
    }
  }, [watchValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 border rounded-lg flex items-center justify-between text-left transition-all duration-200 text-sm ${
            isOpen
              ? "border-none ring-2 bg-white"
              : "border-gray-300 bg-gray-50 hover:bg-white"
          }`}
        >
          <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[150px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelectedValue(option.value);
                  setValue(register.name, option.value, {
                    shouldValidate: true,
                  });
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left transition-colors duration-150 text-sm ${
                  selectedValue === option.value
                    ? "bg-blue-500 text-white"
                    : "text-gray-900 hover:bg-blue-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        <input type="hidden" {...register} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default CustomDropdown;

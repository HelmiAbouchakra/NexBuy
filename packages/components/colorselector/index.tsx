"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

type ColorSelectorProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>; // ✅ required (no hardcoding)
  label?: string;
};

const defaultColors = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

function getErrorMessage<T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>,
): string | undefined {
  const parts = String(name).split(".");
  let current: any = errors;

  for (const p of parts) {
    if (!current) return undefined;
    current = current[p];
  }

  const fieldError = current as FieldError | undefined;
  return fieldError?.message as string | undefined;
}

const ColorSelector = <T extends FieldValues>({
  control,
  errors,
  name,
  label = "Colors",
}: ColorSelectorProps<T>) => {
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState("#FFFFFF");

  const errorMessage = getErrorMessage(errors, name);

  return (
    <div className="mt-2">
      <label className="block font-semibold text-gray-300 mb-1">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-wrap gap-3">
            {[...defaultColors, ...customColors].map((color) => {
              const value = (field.value || []) as string[];
              const isSelected = value.includes(color);
              const isLightColor = ["#FFFFFF", "#FFFF00"].includes(color);

              return (
                <button
                  type="button"
                  key={color}
                  onClick={() =>
                    field.onChange(
                      isSelected
                        ? value.filter((c) => c !== color)
                        : [...value, color],
                    )
                  }
                  className={`w-7 h-7 p-2 rounded-md my-1 flex items-center justify-center border-2 transition ${
                    isSelected ? "scale-110 border-white" : "border-transparent"
                  } ${isLightColor ? "border-gray-600" : ""}`}
                  style={{ backgroundColor: color }}
                />
              );
            })}

            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 bg-gray-800 hover:bg-gray-700 transition"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <Plus size={16} color="white" />
            </button>

            {showColorPicker && (
              <div className="relative flex items-center gap-2">
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-10 h-10 p-0 border-none cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCustomColors((prev) =>
                      prev.includes(newColor) ? prev : [...prev, newColor],
                    );
                    setShowColorPicker(false);
                  }}
                  className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        )}
      />

      {/* ✅ show error message (only if exists) */}
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default ColorSelector;

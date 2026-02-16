import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Input from "../input";

const CustomProperties = ({ control, errors }: any) => {
  const [properties, setProperties] = useState<
    { label: string; value: string[] }[]
  >([]);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Controller
          name="customProperties6"
          control={control}
          render={({ field }) => {
            useEffect(() => {
              field.onChange(properties);
            }, [properties]);

            const addProperty = () => {
              if (!newLabel.trim()) return;
              setProperties([...properties, { label: newLabel, value: [] }]);
              setNewLabel("");
            };

            const addValue = (index: number) => {
              if (!newValue.trim()) return;
              const updatedProperties = [...properties];
              updatedProperties[index].value.push(newValue);
              setProperties(updatedProperties);
              setNewValue("");
            };

            const removeProperty = (index: number) => {
              setProperties(properties.filter((_, i) => i !== index));
            };

            return (
              <div className="mt-2">
                <label className="block font-semibold text-gray-300 mb-1">
                  Custom Properties
                </label>

                <div className="flex flex-col gap-3">
                  {/* Existing Properties */}
                  {properties.map((prop, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 p-3 rounded-lg bg-gray-900"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">
                          {prop.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeProperty(index)}
                        >
                          <X size={20} className="text-red-500" />
                        </button>
                      </div>

                      {/* Add Value to Property */}
                      <div className="flex items-center mt-2 gap-2">
                        <input
                          type="text"
                          className="border outline-none border-gray-700 bg-gray-800 p-2 rounded-md text-white w-full"
                          placeholder="Enter value..."
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                        />

                        <button
                          type="button"
                          className="px-3 py-1 bg-blue-500 text-white rounded-md"
                          onClick={() => addValue(index)}
                        >
                          Add
                        </button>
                      </div>

                      {/* Display Values for Each Property */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {prop.value.map((value, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-700 text-white rounded-md text-sm"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Add New Property */}
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      placeholder="Enter property label (e.g., Material, Size)"
                      value={newLabel}
                      onChange={(e: any) => setNewLabel(e.target.value)}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-blue-500 text-white rounded-md flex items-center gap-1"
                      onClick={addProperty}
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>

                {errors?.customProperties6 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.customProperties6.message as string}
                  </p>
                )}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CustomProperties;

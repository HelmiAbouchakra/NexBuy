"use client";

import { PlusCircle, Trash2 } from "lucide-react";
import React from "react";
import {
  Control,
  Controller,
  FieldArrayPath,
  FieldErrors,
  FieldPath,
  FieldValues,
  useFieldArray,
} from "react-hook-form";
import Input from "../input";

type CustomSpec = { name: string; value: string };

type Props<T extends FieldValues & { custom_specifications: CustomSpec[] }> = {
  control: Control<T>;
  errors: FieldErrors<T>;
};

type SpecsArrayPath<T extends FieldValues> = Extract<
  FieldArrayPath<T>,
  "custom_specifications"
>;

const CustomSpecifications = <
  T extends FieldValues & { custom_specifications: CustomSpec[] },
>({
  control,
}: Props<T>) => {
  type Name = SpecsArrayPath<T>;
  const arrayName = "custom_specifications" as Name;

  const { fields, append, remove } = useFieldArray<T, Name, "id">({
    control,
    name: arrayName,
    keyName: "id",
  });

  return (
    <div>
      <label className="block font-semibold text-gray-300 mb-1">
        Custom Specifications
      </label>

      <div className="flex flex-col gap-3">
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <Controller
              name={`custom_specifications.${index}.name` as FieldPath<T>}
              control={control}
              rules={{ required: "Specification name is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    label="Specification Name"
                    placeholder="Specification name (e.g., Material, Size)"
                    {...field}
                  />
                  {fieldState.error?.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />

            <Controller
              name={`custom_specifications.${index}.value` as FieldPath<T>}
              control={control}
              rules={{ required: "Value is Required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    label="Value"
                    placeholder="Specification value (e.g., Cotton, 100x100)"
                    {...field}
                  />
                  {fieldState.error?.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />

            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => remove(index)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
          onClick={() => append({ name: "", value: "" } as any)}
        >
          <PlusCircle size={20} /> Add Specification
        </button>
      </div>
    </div>
  );
};

export default CustomSpecifications;

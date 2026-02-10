import { useMutation } from "@tanstack/react-query";
import CustomDropdown from "apps/seller-ui/src/shared/components/custom-dropdown";
import { shopCategories } from "apps/seller-ui/src/utils/categories";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function CreateShop({
  sellerId,
  setActiveStep,
}: {
  sellerId: string;
  setActiveStep: (step: number) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Transform categories to dropdown options format
  const categoryOptions = shopCategories.map((category) => ({
    value: category.value,
    label: category.label,
  }));

  const shopCreateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-shop`,
        data
      );

      return response.data;
    },
    onSuccess: () => {
      setActiveStep(3);
    },
  });

  const onSubmit = async (data: any) => {
    const shopData = { ...data, sellerId };
    shopCreateMutation.mutate(shopData);
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-900">
          Setup new shop
        </h3>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="shop name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Bio (Max 100 words)
          </label>
          <input
            type="text"
            placeholder="shop bio"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
            {...register("bio", {
              required: "Bio is required",
              validate: (value) =>
                countWords(value) <= 100 || "Bio can't exceed 100 words",
            })}
          />
          {errors.bio && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.bio.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="shop location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
            {...register("address", {
              required: "Shop Address is required",
            })}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.address.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Opening Hours
          </label>
          <input
            type="text"
            placeholder="e.g., Mon-Fri 9am-6pm"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
            {...register("opening_hours", {
              required: "Opening Hours are required",
            })}
          />
          {errors.opening_hours && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.opening_hours.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            placeholder="https://yourshop.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
            {...register("website", {
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                message: "Enter a valid URL",
              },
            })}
          />
          {errors.website && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.website.message)}
            </p>
          )}
        </div>

        <CustomDropdown
          label="Category"
          placeholder="Select a category"
          options={categoryOptions}
          register={register("category", { required: "Category is Required" })}
          setValue={setValue}
          error={errors.category ? String(errors.category.message) : undefined}
          watchValue={watch("category")}
        />

        <button
          type="submit"
          className="w-full text-base font-semibold cursor-pointer mt-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Create Shop
        </button>
      </form>
    </div>
  );
}

export default CreateShop;

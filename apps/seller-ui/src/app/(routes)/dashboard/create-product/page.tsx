"use client";

import ImagePlaceholder from "@/shared/components/image-placeholder";
import ColorSelector from "@packages/components/colorselector";
import CustomProperties from "@packages/components/custom-properties";
import CustomSpecifications from "@packages/components/custom-specifications";
import Input from "@packages/components/input";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateProductFormValues = {
  title: string;
  description: string;
  tags: string;
  warranty: string;
  slug: string;
  brand?: string;
  colors: string[];
  images: (File | null)[];
  custom_specifications: { name: string; value: string }[];
  cash_on_delivery: "yes" | "no";
};

const Page = () => {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      warranty: "",
      slug: "",
      brand: "",
      colors: [],
      images: [null],
      custom_specifications: [],
      cash_on_delivery: "yes",
    },
  });

  const [openImageModel, setOpenImageModel] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [images, setImages] = useState<(File | null)[]>([null]);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CreateProductFormValues> = (data) => {
    console.log(data);
  };

  const handleImageChange = (file: File | null, index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    if (index === images.length - 1 && images.length < 8) {
      updatedImages.push(null);
    }
    setImages(updatedImages);

    setValue("images", updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      let updatedImages = [...prevImages];

      if (index === -1) {
        updatedImages[0] = null;
      } else {
        updatedImages.splice(index, 1);
      }

      if (!updatedImages.includes(null) && updatedImages.length < 8) {
        updatedImages.push(null);
      }

      setValue("images", updatedImages);

      return updatedImages;
    });
  };

  return (
    <form
      className="w-full mx-auto p-8 shadow-md rounded-lg text-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Heading & Breadcrumbs */}
      <h2 className="text-2xl py-2 font-semibold font-Poppins text-white">
        Create Product
      </h2>
      <div className="flex items-center">
        <span className="text-[#80Deea] cursor-pointer"> Dashboard</span>
        <ChevronRight size={20} className="opacity-[0.8]" />
        <span>Create Product</span>
      </div>

      {/* Content Layout */}
      <div className="py-4 w-full flex gap-6">
        {/* left side - Image upload section */}
        <div className="md:w-[35%]">
          {images?.length > 0 && (
            <ImagePlaceholder
              setOpenImageModel={setOpenImageModel}
              size="765 x 850"
              small={false}
              index={0}
              onImageChange={handleImageChange}
              onRemove={handleRemoveImage}
            />
          )}

          <div className="grid grid-cols-2 gap-3 mt-4">
            {images.slice(1).map((_, index) => (
              <ImagePlaceholder
                setOpenImageModel={setOpenImageModel}
                size="765 x 850"
                key={index}
                small
                index={index + 1}
                onImageChange={handleImageChange}
                onRemove={handleRemoveImage}
              />
            ))}
          </div>
        </div>

        {/* Right side - form inputs*/}
        <div className="md:w-[65%]">
          <div className="w-full flex gap-6">
            {/* Product Title Input*/}
            <div className="w-2/4">
              <Input
                label="Product Title *"
                placeholder="Enter Product Title"
                {...register("title", { required: "Title is required!" })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}

              <div className="mt-2">
                <Input
                  type="textarea"
                  rows={7}
                  cols={10}
                  label="Short Description * (Max 150 words)"
                  placeholder="Enter product description for quick view"
                  {...register("description", {
                    required: "Description is required",
                    validate: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      return (
                        wordCount <= 150 ||
                        `Description must be less than 150 words (Current: ${wordCount})`
                      );
                    },
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <Input
                  label="Tags *"
                  placeholder="Enter product tags (e.g., 'electronics, gadgets')"
                  {...register("tags", {
                    required: "Separate related products tags with a coma (,)",
                  })}
                />
                {errors.tags && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tags.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <Input
                  label="Warranty *"
                  placeholder="1 Year / No Warranty"
                  {...register("warranty", {
                    required: "Warranty is required!",
                  })}
                />
                {errors.warranty && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.warranty.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <Input
                  label="Slug *"
                  placeholder="Enter product slug (e.g., 'product-slug')"
                  {...register("slug", {
                    required: "Slug is required!",
                    pattern: {
                      value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                      message:
                        "Slug must be lowercase, alphanumeric, and can include hyphens (e.g., 'product-slug')",
                    },
                    minLength: {
                      value: 3,
                      message: "Slug must be at least 3 characters long.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Slug must be less than 50 characters long.",
                    },
                  })}
                />
                {errors.slug && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <Input
                  label="Brand"
                  placeholder="Enter brand name if applicable (e.g., 'Apple')"
                  {...register("brand")}
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <ColorSelector<CreateProductFormValues>
                  control={control}
                  errors={errors}
                  name="colors"
                />
              </div>

              <div className="mt-2">
                <CustomSpecifications<CreateProductFormValues>
                  control={control}
                  errors={errors}
                />
              </div>

              {/* WIP: fix the control type and also the input type */}
              <div className="mt-2">
                <CustomProperties control={control} errors={errors} />
              </div>

              <div className="mt-2">
                <label className="block font-semibold text-gray-300 mb-1">
                  Cash On Delivery *
                </label>
                <select
                  {...register("cash_on_delivery", {
                    required: "Please select if cash on delivery is available",
                  })}
                  className="w-full border outline-none border-gray-700 bg-transparent rounded-md p-2 text-white"
                >
                  <option value="yes" className="bg-black">
                    Yes
                  </option>
                  <option value="no" className="bg-black">
                    No
                  </option>
                </select>
                {errors.cash_on_delivery && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cash_on_delivery.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="w-2/4">
              <label className="block font-semibold text-gray-300 mb-1">
                Category *
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;

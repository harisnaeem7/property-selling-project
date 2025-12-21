import { useFormContext } from "react-hook-form";
import type { CreatePropertyForm } from "./input.types";
import { createProperty } from "../../../../api/auth";
import { useState } from "react";

export const useCreatePropertyController = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { handleSubmit, trigger } = useFormContext<CreatePropertyForm>();

  const onSubmit = async (data: CreatePropertyForm) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("purpose", data.purpose);
    formData.append("price", String(data.price));
    formData.append("propertyType", data.propertyType);
    formData.append("bedrooms", String(data.bedrooms));
    formData.append("bathrooms", String(data.bathrooms));
    formData.append("utilities", data.utilities);

    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("email", String(data.email));
    formData.append("phone", String(data.phone));

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }
    try {
      const res = await createProperty(formData);
      setSuccessMessage(res.data.message);
    } catch (err) {
      console.log(err);
    }

    return console.log("data", data);
  };

  return { handleSubmit, onSubmit, trigger, successMessage };
};

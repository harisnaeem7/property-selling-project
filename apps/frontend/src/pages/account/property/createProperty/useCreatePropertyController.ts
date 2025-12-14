import { useFormContext } from "react-hook-form";
import type { CreatePropertyForm } from "./input.types";
import { createProperty } from "../../../../api/auth";

export const useCreatePropertyController = () => {
  const { handleSubmit, trigger } = useFormContext<CreatePropertyForm>();

  const onSubmit = async (data: CreatePropertyForm) => {
    console.log("test");
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

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    formData.append("email", data.email);
    formData.append("phone", data.phone);
    try {
      const res = await createProperty(formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    return console.log("data", data);
  };

  return { handleSubmit, onSubmit, trigger };
};

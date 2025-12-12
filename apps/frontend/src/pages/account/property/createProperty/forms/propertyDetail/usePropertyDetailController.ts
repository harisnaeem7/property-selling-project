import { useFormContext } from "react-hook-form";

export const usePropertyDetailController = () => {
  const fields = ["title", "price", "bedrooms", "bathrooms"];
  const selectFields = [
    {
      title: "purpose",
      heading: "Purpose",
      options: ["sell", "rent"],
    },
    {
      title: "propertyType",
      heading: "Property Type",
      options: [
        "house",
        "apartment",
        "condo",
        "detached",
        "semidetached",
        "basement",
      ],
    },
    {
      title: "utilities",
      heading: "Utilities",
      options: ["heat", "water", "electricity", "none"],
    },
  ];
  const purposes = ["sell", "rent"];
  const numericFields = ["price", "bedrooms", "bathrooms"];

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const capitalize = (text: string) =>
    text.replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    register,
    errors,
    fields,
    purposes,
    selectFields,
    capitalize,
    numericFields,
  };
};

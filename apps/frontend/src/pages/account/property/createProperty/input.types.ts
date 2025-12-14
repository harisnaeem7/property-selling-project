export type CreatePropertyForm = {
  title: string;
  purpose: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  utilities: string;
  description: string;
  address: string;
  city: string;
  images: File[];
  email: string;
  phone: string;
};

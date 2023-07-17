import { Model } from "mongoose";

export type CowLocation =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";

export type CowBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export type CowLabel = "for sale" | "sold out";

export type CowCategory = "Dairy" | "Beef" | "Dual Purpose";

export type CowSeller = string;

export interface ICow {
  save(): unknown;
  name: string;
  age: number;
  price: number;
  location: CowLocation;
  breed: CowBreed;
  weight: number;
  label?: CowLabel;
  category: CowCategory;
  seller: CowSeller;
}

export type CowModel = Model<ICow, Record<string, unknown>>;
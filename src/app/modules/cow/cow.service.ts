import { ICow } from "./cow.interface";
import { CowModel } from "./cow.model";

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const createdCow = await CowModel.create(cow);

  if (!createdCow) {
    throw new Error("Failed to create cow!");
  }
  return createdCow;
};

const getAllCows = async (
  page: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
  minPrice: number | undefined,
  maxPrice: number | undefined,
  location: string | undefined,
  searchTerm: string | undefined
): Promise<ICow[]> => {
  // Build the filter object based on the provided parameters
  const filter: any = {};

  // Add the minPrice and maxPrice filters
  if (minPrice !== undefined) {
    filter.price = { $gte: minPrice };
  }
  if (maxPrice !== undefined) {
    filter.price = { ...filter.price, $lte: maxPrice };
  }

  // Add the location filter
  if (location !== undefined) {
    filter.location = location;
  }

  // Add the searchTerm filter
  if (searchTerm !== undefined) {
    const searchRegex = new RegExp(searchTerm, "i");
    filter.$or = [
      { location: searchRegex },
      { breed: searchRegex },
      { category: searchRegex },
    ];
  }

  // Retrieve the paginated and filtered cow listings
  const cows = await CowModel.find(filter)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return cows;
};

const getSingleCow = async (cowId: string): Promise<ICow | null> => {
  const cow = await CowModel.findById(cowId);
  return cow;
};

const updateCow = async (
  cowId: string,
  updateData: Partial<ICow>
): Promise<ICow | null> => {
  const updatedCow = await CowModel.findByIdAndUpdate(cowId, updateData, {
    new: true,
  });
  return updatedCow;
};

const deleteCow = async (cowId: string): Promise<ICow | null> => {
  const deletedCow = await CowModel.findByIdAndDelete(cowId);
  return deletedCow;
};

export default {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};

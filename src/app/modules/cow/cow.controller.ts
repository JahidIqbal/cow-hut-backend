import { Request, Response, NextFunction } from 'express';
import cowService from './cow.service';
import { ICow } from './cow.interface';

const createCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cowData: ICow = req.body;

    if (!cowData) {
      return res.status(400).json({
        success: false,
        message: 'Cow data is missing',
        data: null,
      });
    }

    const createdCow = await cowService.createCow(cowData);
    res.status(200).json({
      success: true,
      message: 'Cow created successfully',
      data: createdCow,
    });
  } catch (err) {
    next(err);
  }
};


const getAllCows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "price",
      sortOrder = "asc",
      minPrice,
      maxPrice,
      location,
      searchTerm,
    } = req.query;

    const cows = await cowService.getAllCows(
      +page,
      +limit,
      sortBy.toString(),
      sortOrder.toString(),
      minPrice !== undefined ? +minPrice : undefined,
      maxPrice !== undefined ? +maxPrice : undefined,
      location !== undefined ? location.toString() : undefined,
      searchTerm !== undefined ? searchTerm.toString() : undefined
    );

    res.status(200).json({
      success: true,
      message: "Cows retrieved successfully",
      data: cows,
    });
  } catch (err) {
    next(err);
  }
};


const getSingleCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const cow = await cowService.getSingleCow(id);

    if (!cow) {
      return res.status(404).json({
        success: false,
        message: 'Cow not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cow retrieved successfully',
      data: cow,
    });
  } catch (err) {
    next(err);
  }
};

const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCow = await cowService.updateCow(id, updateData);

    if (!updatedCow) {
      return res.status(404).json({
        success: false,
        message: 'Cow not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cow updated successfully',
      data: updatedCow,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedCow = await cowService.deleteCow(id);

    if (!deletedCow) {
      return res.status(404).json({
        success: false,
        message: 'Cow not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cow deleted successfully',
      data: deletedCow,
    });
  } catch (err) {
    next(err);
  }
};

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};

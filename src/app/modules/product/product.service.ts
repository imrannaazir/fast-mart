import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Brand from '../brand/brand.model';
import { TProduct } from './product.interface';
import Product from './product.model';
import Category from '../category/category.model';
import PowerSource from '../powerSource/powerSource.model';
import Connectivity from '../connectivity/connectivity.model';
import Tag from '../tag/tag.model';
import OperatingSystem from '../operatingSystem/operatingSystem.model';

// create product
const createProduct = async (payload: TProduct) => {
  /* 
  
1. check is brand exist 
2. check is category  exist
3. check is operatingSystem  exist
4. check is powerSource  exist
5. check is connectivity exist
6. check is tags

  */

  // check is brand is exist
  const isBrandExist = await Brand.findById(payload.brand);
  if (!isBrandExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Brand not founded.');
  }

  // check category is exist
  const isCategoryExist = await Category.findById(payload.category);
  if (!isCategoryExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not founded.');
  }

  // check is operatingSystem  exist
  if (payload.operatingSystem) {
    const isOperatingSystemExist = await OperatingSystem.findById(
      payload.operatingSystem,
    );
    if (!isOperatingSystemExist) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Operating system not founded.',
      );
    }
  }

  // check is powerSource  exist
  if (payload.powerSource) {
    const isPowerSourceExist = await PowerSource.findById(payload.powerSource);
    if (!isPowerSourceExist) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Power source not founded.');
    }
  }

  // check is connectivity exist
  if (payload.connectivity) {
    const isConnectivityExist = await Connectivity.findById(
      payload.connectivity,
    );
    if (!isConnectivityExist) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Connectivity not founded.');
    }
  }
  //  check is tags exist
  if (payload.tags && payload.tags.length > 0) {
    payload.tags.forEach(async tag => {
      const isTagExist = await Tag.findById(tag);
      if (!isTagExist) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          `Tag not founded by id : ${tag}`,
        );
      }
    });
  }

  //  ⚠️⚠️⚠️⚠️ generate model
  payload.model = 'brand-134';
  console.log('generate model');

  // ⚠️⚠️⚠️ include createdBy

  const result = await Product.create(payload);
  return result;
};

// get all product
const getAllProduct = async () => {
  const result = await Product.find({}).populate(
    'brand createdBy category powerSource connectivity tags',
  );
  return result;
};
const ProductService = {
  createProduct,
  getAllProduct,
};

export default ProductService;

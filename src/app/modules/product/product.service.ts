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
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';

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

  // if quantity is 0 set status out of stock
  if (payload.quantity === 0) {
    payload.status = 'out-of-stock';
  }
  //  ⚠️⚠️⚠️⚠️ generate model
  payload.model = new Date().getTime().toString();
  console.log('generate model');

  // ⚠️⚠️⚠️ include createdBy
  payload.createdBy = '65df56e972e5d352ce0326ae';
  const result = await Product.create(payload);
  return result;
};

// get all product
const getAllProduct = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  delete queryObj['tags'];
  const tags = (query?.tags as string)?.split(',');

  if (query.tags) {
    queryObj['tags'] = { $in: tags };
  }

  // product query model
  const productModelQuery = new QueryBuilder(
    Product.find({}).populate(
      'brand createdBy category powerSource connectivity tags operatingSystem',
    ),
    queryObj,
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const data = await productModelQuery.modelQuery;
  const meta = await productModelQuery.countTotal();

  return { data, meta };
};

// get single product by id
const getSingleProductById = async (id: string) => {
  const result = await Product.findById(id).populate({
    path: 'tags',
    select: '-__v',
  });
  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Product not founded by this ID.',
    );
  }
  return result;
};

// delete product by Id
const deleteProductById = async (productId: string) => {
  // check is product exist
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }

  const result = await Product.findByIdAndDelete(productId);

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete product.');
  }
  return {
    deletedProductId: result?._id,
  };
};

//update single product by Id
const updateProductById = async (id: string, payload: Partial<TProduct>) => {
  // check if product is exist
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }
  if (payload.quantity && payload.quantity > 0) {
    payload.status = 'in-stock';
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update product.');
  }

  return result;
};
const ProductService = {
  createProduct,
  getAllProduct,
  getSingleProductById,
  deleteProductById,
  updateProductById,
};

export default ProductService;

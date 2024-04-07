import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Brand from '../brand/brand.model';
import { TProduct } from './product.interface';
import Product from './product.model';
import Category from '../category/category.model';
import Tag from '../tag/tag.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';
import { Types } from 'mongoose';
import User from '../user/user.model';

// create product
const createProduct = async (payload: TProduct, userId: Types.ObjectId) => {
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

  payload.createdBy = userId;
  const result = await Product.create(payload);
  return result;
};

// get all product
const getAllProduct = async (
  query: Record<string, unknown>,
  userEmail: string,
) => {
  // check is user exist
  const isUserExist = await User.findOne({ email: userEmail });
  if (!userEmail) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Account does not exist.');
  }

  const queryObj = { ...query };
  delete queryObj['tags'];
  const tags = (query?.tags as string)?.split(',');

  if (query.tags) {
    queryObj['tags'] = { $in: tags };
  }

  if (isUserExist?.role === 'user') {
    queryObj.createdBy = `${isUserExist._id}`;
  }

  // product query model
  const productModelQuery = new QueryBuilder(
    Product.find({
      $and: [
        { price: { $gte: query.lowPrice } },
        { price: { $lte: query.highPrice } },
      ],
    }).populate(
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
const getSingleProductById = async (id: string, userEmail: string) => {
  // check is user exist
  const isUserExist = await User.findOne({ email: userEmail });
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Account does not founded.');
  }

  const result = await Product.findById(id)
    .populate('brand category')
    .populate({
      path: 'tags',
      select: '-__v',
    });
  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Product not founded by this ID.',
    );
  }

  if (
    isUserExist.role === 'user' &&
    `${result.createdBy}` !== `${isUserExist._id}`
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Access forbidden.');
  }
  return result;
};

// delete product by Id
const deleteProductById = async (productId: string, userEmail: string) => {
  // check is user exist
  const isUserExist = await User.findOne({ email: userEmail });
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Account does not founded.');
  }

  // check is product exist
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }

  if (
    isUserExist.role === 'user' &&
    isProductExist.createdBy !== isUserExist._id
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Access forbidden.');
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
const updateProductById = async (
  id: string,
  payload: Partial<TProduct>,
  userEmail: string,
) => {
  // check is user exist
  const isUserExist = await User.findOne({ email: userEmail });
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Account does not founded.');
  }

  // check if product is exist
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }

  if (
    isUserExist.role === 'user' &&
    `${isProductExist.createdBy}` !== `${isUserExist._id}`
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Access forbidden.');
  }

  if (payload.quantity && payload.quantity > 0) {
    payload.status = 'in-stock';
  } else {
    payload.status = 'out-of-stock';
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

// get highest product price
const getHighestProductPrice = async () => {
  const mostValuableProduct = await Product.findOne({}).sort('-price');

  if (!mostValuableProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product founded.');
  }

  return { highRange: mostValuableProduct.price };
};

// bulk product delete
const deleteBulkProduct = async (ids: string[]) => {
  const result = await Product.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount < 1) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Failed to delete any product.',
    );
  }

  return { deletedProductCount: result.deletedCount };
};

const ProductService = {
  createProduct,
  getAllProduct,
  getSingleProductById,
  deleteProductById,
  updateProductById,
  getHighestProductPrice,
  deleteBulkProduct,
};

export default ProductService;

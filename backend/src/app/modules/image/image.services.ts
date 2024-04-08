import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';
import { TImage } from './image.interface';
import { Image } from './image.model';

// create image
const createSingleImage = async (payload: TImage): Promise<TImage> => {
  const result = await Image.create(payload);
  return result;
};

// create multiple image
const createManyImage = async (payload: TImage[]): Promise<TImage[]> => {
  const result = await Image.insertMany(payload);
  return result;
};

// get all image
const getAllImages = async (
  query: Record<string, unknown>,
): Promise<{ result: TImage[]; meta: TMeta }> => {
  const imageModelQuery = new QueryBuilder(Image.find(), query)
    .search(['file_name'])
    .fields()
    .filter()
    .sort()
    .paginate();

  const result = await imageModelQuery.modelQuery;

  const meta = await imageModelQuery.countTotal();

  return { result, meta };
};

const ImageServices = {
  createSingleImage,
  createManyImage,
  getAllImages,
};

export default ImageServices;

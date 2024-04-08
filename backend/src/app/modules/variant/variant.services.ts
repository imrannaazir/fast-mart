import { TVariant } from './variant.interfaces';
import { Variant } from './variant.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';

// create variant
const createVariant = async (payload: TVariant): Promise<TVariant> => {
  const result = await Variant.create(payload);
  return result;
};

// get all variant
const getAllVariant = async (
  query: Record<string, unknown>,
): Promise<{ result: TVariant[]; meta: TMeta }> => {
  const variantModelQuery = new QueryBuilder(Variant.find(), query)
    .search(['variant_name'])
    .filter()
    .fields()
    .sort()
    .paginate();

  const result = await variantModelQuery.modelQuery;
  const meta = await variantModelQuery.countTotal();

  return { result, meta };
};

const VariantServices = {
  createVariant,
  getAllVariant,
};

export default VariantServices;

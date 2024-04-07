import QueryBuilder from '../../builder/QueryBuilder';
import { icons } from './icons.constants';
import Icon from './icon.model';

// create icons
const createIcons = async () => {
  const iconNames = icons.map(iconName => ({ name: iconName }));
  const result = await Icon.insertMany(iconNames);
  return result;
};

// get all icons
const getAllIcons = async (query: Record<string, unknown>) => {
  // product query model
  const iconsModelQuery = new QueryBuilder(Icon.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const data = await iconsModelQuery.modelQuery;
  const meta = await iconsModelQuery.countTotal();

  return { data, meta };
};

const IconServices = {
  createIcons,
  getAllIcons,
};

export default IconServices;

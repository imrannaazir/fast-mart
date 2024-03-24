import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TTag } from './tag.interface';
import Tag from './tag.model';

// create tag
const createTag = async (payload: TTag) => {
  // check is already a Tag by provided name
  const isAlreadyTagByName = await Tag.findOne({
    name: payload.name,
  });
  if (isAlreadyTagByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a Tag by this name.',
    );
  }

  // create
  const result = await Tag.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create Tag.');
  }

  return result;
};

// get all tags
const getAllTags = async () => {
  const result = await Tag.find({});
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No tags founded.');
  }

  return result;
};
const TagService = {
  createTag,
  getAllTags,
};

export default TagService;

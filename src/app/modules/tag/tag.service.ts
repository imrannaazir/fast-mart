import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TTag } from './tag.interface';
import Tag from './tag.model';

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

const TagService = {
  createTag,
};

export default TagService;

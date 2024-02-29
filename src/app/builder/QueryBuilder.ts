import { FilterQuery, Query } from 'mongoose';
/*
 * make method for search
 * make method for filtering
 * make method for sorting
 * make method for paginate
 * make method for field selection
 * make method for count total
 */
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search data
  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;

    /* 
    something.find({
        $or:[
            {
                field:"searchTerm"
            }
        ]
    })
    */

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // filter data
  filter() {
    const filterObj = { ...this.query };
    const fieldToExclude = ['searchTerm', 'limit', 'page', 'sort', 'fields'];

    // exclude fields from filter object
    fieldToExclude.forEach(field => delete filterObj[field]);

    this.modelQuery = this.modelQuery.find(filterObj as FilterQuery<T>);

    return this;
  }

  // sort data
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  // fields selection
  fields() {
    console.log(this.query);

    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;

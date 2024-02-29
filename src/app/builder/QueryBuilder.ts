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
    const fieldsToExclude = ['searchTerm', 'limit', 'sort', 'page', 'fields'];

    fieldsToExclude.forEach(field => delete filterObj[field]);

    this.modelQuery = this.modelQuery.find(filterObj as FilterQuery<T>);
    return this;
  }
}

export default QueryBuilder;

import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ['search', 'sortBy', 'sortOrder', 'filter'];

    excludeFields.forEach((el) => delete queryObj[el]);

    if (this.query.filter) {
      this.modelQuery = this.modelQuery.find({
        author: new mongoose.Types.ObjectId(this.query.filter as string),
      } as FilterQuery<T>);
    } else {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : '';
    this.modelQuery = this.modelQuery.sort(sortOrder + sort);

    return this;
  }
}

export default QueryBuilder;

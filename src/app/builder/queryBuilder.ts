import mongoose, { FilterQuery, Query } from 'mongoose';



class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search as string;
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
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'minPrice', 'maxPrice', 'rating', 'category', 'inStock'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Remove empty fields from queryObj
    Object.keys(queryObj).forEach((key) => {
      if (!queryObj[key]) {
        delete queryObj[key];
      }
    });

    // Add type assertion to filterConditions
    const filterConditions = {} as Record<string, any>;


    if (this.query.category) {
      filterConditions.category = this.query.category;
    }

    if (this.query.inStock) {
      filterConditions.inStock = this.query.inStock === 'true';
    }

    if (this.query.minPrice || this.query.maxPrice) {
      filterConditions.price = {};
      if (this.query.minPrice) {
        filterConditions.price.$gte = Number(this.query.minPrice);
      }
      if (this.query.maxPrice) {
        filterConditions.price.$lte = Number(this.query.maxPrice);
      }
    }

    if (this.query.rating) {
      filterConditions.rating = { $gte: Number(this.query.rating) };
    }

    this.modelQuery = this.modelQuery.find({ ...queryObj, ...filterConditions } as FilterQuery<T>);
    return this;
  }

  // filter() {
  //   const queryObj = { ...this.query };
  //   const excludeFields = ['search', 'sortBy', 'sortOrder', 'filter'];
  //   excludeFields.forEach((el) => delete queryObj[el]);
  //
  //   // Remove empty fields from queryObj
  //   Object.keys(queryObj).forEach((key) => {
  //     if (!queryObj[key]) {
  //       delete queryObj[key];
  //     }
  //   });
  //
  //   if (this.query.filter) {
  //     this.modelQuery = this.modelQuery.find({
  //       author: new mongoose.Types.ObjectId(this.query.filter as string),
  //     } as FilterQuery<T>);
  //   } else {
  //     this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
  //   }
  //
  //   return this;
  // }

  sort() {
    const sortBy = this.query.sortBy as string;

    const sortOptions: Record<string, string> = {
      asc: 'createdAt',
      desc: '-createdAt',
      price_asc: 'price',
      price_desc: '-price',
      rating_desc: '-rating'
    };

    const sortField = sortOptions[sortBy] || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sortField);

    return this;
  }


  // sort() {
  //   const sort =
  //     (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
  //   const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : '';
  //   this.modelQuery = this.modelQuery.sort(sortOrder + sort);
  //
  //   return this;
  // }
}

export default QueryBuilder;

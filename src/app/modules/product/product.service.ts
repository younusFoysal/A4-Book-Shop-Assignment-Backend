import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const ProductSerachable = ['brand', 'name', 'category'];

const createProductIntoDb = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);

  return result;
};

const getsingleIntoDb = async (id: string) => {
  const result = await ProductModel.findById(id);

  return result;
};

const getallProductintoDb = async (query: Record<string, unknown>) => {
  const SearchQuery = new QueryBuilder(ProductModel.find(), query)
    .search(ProductSerachable)
    .filter()
    .sort();
  const result = await SearchQuery.modelQuery;
  return result;
};

const UpdateProductIntoDb = async (
  payload: Partial<TProduct>,
  productId: string,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const DeleteProductIntoDb = async (productId: string) => {
  const isaviable = await ProductModel.findById(productId);
  if (!isaviable) {
    throw new AppError(404, 'Product is not available');
  } else {
    const result = await ProductModel.findByIdAndDelete(productId);
    return result;
  }
};

export const productServices = {
  createProductIntoDb,
  UpdateProductIntoDb,
  DeleteProductIntoDb,
  getallProductintoDb,
  getsingleIntoDb,
};

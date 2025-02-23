import { TOrderData } from './orders.interface';
import { OrderModel } from './orders.model';
import { ProductModel } from '../product/product.model';
import QueryBuilder from '../../builder/queryBuilder';



const AddOrderDataintoDb = async (payload: TOrderData) => {

      const product = await ProductModel.findById(payload.productId);
      if (product) {
        const newQuantity = Math.max(0, product.quantity - payload.quantity);
        await ProductModel.findByIdAndUpdate(
          payload.productId,
          { quantity: newQuantity },
          { new: true }
        );
      }

  const result = await OrderModel.create(payload);
  return result;
};


const getallOrderintoDb = async (query: Record<string, unknown>) => {
  //console.log(query);
  const ProductSearchableFields = ['user.name', 'user.email', 'paymentStatus'];
  const searchQuery = new QueryBuilder(OrderModel.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
  const result = await searchQuery.modelQuery;
  return result;
};

const getOrderById = async (orderId: string) => {
  return await OrderModel.findById(orderId);
};

const updateOrder = async (orderId: string, payload: Partial<TOrderData>) => {
  return await OrderModel.findByIdAndUpdate(orderId, payload, { new: true, runValidators: true });
};





const deleteOrder = async (orderId: string) => {
  return await OrderModel.findByIdAndDelete(orderId);
};

export const ordersServices = {
  AddOrderDataintoDb,
  getallOrderintoDb,
  getOrderById,
  updateOrder,
  deleteOrder,
};

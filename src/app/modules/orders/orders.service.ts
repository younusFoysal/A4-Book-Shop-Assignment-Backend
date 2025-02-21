import { TOrderData } from './orders.interface';
import { OrderModel } from './orders.model';

const AddOrderDataintoDb = async (payload: TOrderData) => {
  const result = await OrderModel.create(payload);

  return result;
};

const getallOrderintoDb = async () => {
  const result = await OrderModel.find();
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

import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import httpStatus from 'http-status';
import { ordersServices } from './orders.service';

const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body;

  const result = await ordersServices.AddOrderDataintoDb(orderData);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getallOrder = catchAsync(async (req, res) => {
  const result = await ordersServices.getallOrderintoDb();
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Orders fetched successfully',
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await ordersServices.getOrderById(orderId);
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const orderData = req.body;
  const result = await ordersServices.updateOrder(orderId, orderData);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  await ordersServices.deleteOrder(orderId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
  });
});


export const orderController = {
  createOrder,
  getallOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};

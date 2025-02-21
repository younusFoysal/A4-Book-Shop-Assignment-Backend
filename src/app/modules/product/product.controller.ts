import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import { productServices } from './product.service';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  const result = await productServices.createProductIntoDb(productData);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await productServices.getsingleIntoDb(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const { productId } = req.params;
  const result = await productServices.UpdateProductIntoDb(
    productData,
    productId,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Updated successfully',
    data: result,
  });
});

const getallproduct = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await productServices.getallProductintoDb(query);
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products fetched successfully',
    data: result,
  });
});

const DeleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await productServices.DeleteProductIntoDb(productId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully',
    data: {},
  });
});
export const productController = {
  createProduct,
  updateProduct,
  DeleteProduct,
  getSingleProduct,
  getallproduct,
};

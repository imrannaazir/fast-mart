import { TProduct } from './product.interface';
import Product from './product.model';

// create product
const createProduct = async (payload: TProduct) => {
  payload.model = 'brand-134';
  const result = await Product.create(payload);
  console.log(result);
};

const ProductService = {
  createProduct,
};

export default ProductService;

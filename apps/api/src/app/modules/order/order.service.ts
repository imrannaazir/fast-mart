import { TPlaceOrderInput } from '@repo/utils/types';
import CartItem from '../cart-item/cart-item.model';

// place order
const placeOrder = async (payload: TPlaceOrderInput, userId: string) => {
  const cartList = await CartItem.find({
    _id: {
      $in: payload.cartItemsId,
    },
  }).populate({
    path: 'product',
    populate: {
      path: 'variants',
      populate: 'variantId options',
    },
  });

  const orderItems = cartList.map((cartItem) => {
    console.log('.............................');
    console.log(cartItem.product.variants[0]);

    return cartItem;
  });
  return null;
};

const OrderServices = { placeOrder };

export default OrderServices;

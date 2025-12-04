import { useMemo } from 'react';
import { useCart } from '../context/CartContext';

import Drawer from './ui/Drawer';
import Button from './ui/Button';
import ShoppingCartItem from './ShoppingCartItem';
import CartIcon from './ui/icons/CartIcon';
import InfoIcon from './ui/icons/InfoIcon';

const ShoppingCart = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeItem, totalItems } = useCart();

  const grandTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const discount = item.quantity > 5 ? itemTotal * 0.1 : 0;

      return total + (itemTotal - discount);
    }, 0);
  }, [cartItems]);

  return (
    <Drawer isOpen={isCartOpen} onClose={closeCart} title={`Shopping Cart (${totalItems})`}>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <CartIcon className="mx-auto h-24 w-24 text-gray-300" strokeWidth={1} />
          <p className="mt-4 text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <ShoppingCartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Products with quantity greater than 5 receive a 10% discount!
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span className="text-gray-800">Grand Total:</span>
              <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
            </div>

            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default ShoppingCart;

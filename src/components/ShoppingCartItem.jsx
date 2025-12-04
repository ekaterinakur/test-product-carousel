import { useMemo } from 'react';

import Button from './ui/Button';

const ShoppingCartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { itemTotal, hasDiscount, discount, finalPrice } = useMemo(() => {
    const itemTotal = item.price * item.quantity;
    const hasDiscount = item.quantity > 5;
    const discount = hasDiscount ? itemTotal * 0.1 : 0;
    const finalPrice = itemTotal - discount;

    return { itemTotal, hasDiscount, discount, finalPrice };
  }, [item.price, item.quantity]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex gap-4">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>

          {hasDiscount && (
            <div className="mt-1 inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              10% OFF (qty &gt; 5)
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                variant="secondary"
                size="sm"
                disabled={item.quantity <= 1}
                className="w-8 h-8 !p-0"
              >
                -
              </Button>
              <span className="w-12 text-center font-semibold text-gray-800">{item.quantity}</span>
              <Button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                variant="secondary"
                size="sm"
                className="w-8 h-8 !p-0"
              >
                +
              </Button>
            </div>
            <Button onClick={() => onRemove(item.id)} variant="text" size="sm">
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-800">${itemTotal.toFixed(2)}</span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold mt-1">
          <span className="text-gray-800">Total:</span>
          <span className="text-blue-600">${finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;

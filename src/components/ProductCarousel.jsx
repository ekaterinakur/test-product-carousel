import ProductCard from './ProductCard';

import { useCart } from '../context/CartContext';

const ProductCarousel = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;

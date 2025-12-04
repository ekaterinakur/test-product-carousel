import Button from './ui/Button';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

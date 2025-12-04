import { useCart } from '../context/CartContext';
import Button from './ui/Button';
import Badge from './ui/Badge';
import CartIcon from './ui/icons/CartIcon';
import Container from './ui/Container';

const Header = () => {
  const { totalItems, openCart } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <Container className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tech Store</h1>
            <p className="text-sm text-gray-600 mt-1">Premium tech products at great prices</p>
          </div>

          <Button onClick={openCart} className="relative">
            <CartIcon />
            <span>Cart</span>
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 w-6 h-6">{totalItems}</Badge>
            )}
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;

import Header from './components/Header';
import ProductCarousel from './components/ProductCarousel';
import ShoppingCart from './components/ShoppingCart';
import Container from './components/ui/Container';

import { products } from './data/products';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Main Content */}
      <main>
        <Container className="py-8">
          <ProductCarousel products={products} />
        </Container>
      </main>

      {/* Shopping Cart Drawer */}
      <ShoppingCart />
    </div>
  );
}

export default App;

import CartDrawer from '@/components/Rewards/CartDrawer';
import CheckoutModal from '@/components/Rewards/CheckoutModal';
import ProductCard from '@/components/Rewards/ProductCard';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import useUserInfo from '@/Hooks/useUserInfo';
import { useGetRewardsQuery } from '@/redux/api/api';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { PiGiftDuotone } from 'react-icons/pi';

// import { products } from './data/products';

export default function Rewards() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { userInfo } = useUserInfo();
  const { data, error, isLoading } = useGetRewardsQuery();
  const products = data;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="text-center text-red-500 font-bold text-xl mt-8">
        Something went wrong. Please try again later.
      </div>
    );
  }
  //   console.log(userInfo);

  const addToCart = product => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = productName => {
    setCart(prev => prev.filter(item => item.name !== productName));
  };

  const updateQuantity = (productName, quantity) => {
    if (quantity === 0) {
      removeFromCart(productName);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.name === productName ? { ...item, quantity } : item,
      ),
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.points * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-primary flex items-center gap-1">
            <PiGiftDuotone size={30} className="text-emerald-600" />
            Redeem Your{' '}
            <span className="text-white bg-emerald-500 px-2 py-1 rounded-md">
              {' '}
              {userInfo?.points}
            </span>{' '}
            Rewards
          </h1>
          <Button
            variant="outline"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <CartDrawer
        cart={cart}
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        totalAmount={totalAmount}
        points={userInfo?.points}
      />

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={totalAmount}
      />
    </div>
  );
}

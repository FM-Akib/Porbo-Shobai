import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/Hooks/use-toast';
import useUserInfo from '@/Hooks/useUserInfo';
import { usePlaceOrderMutation } from '@/redux/api/api';
import { useState } from 'react';
import { ToastAction } from '../ui/toast';

export default function CheckoutModal({ open, onClose, cart, totalAmount }) {
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const { userInfo } = useUserInfo();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const toast = useToast();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Handle checkout logic here
      //   console.log('Form submitted:', {
      //     ...formData,
      //     cart,
      //     totalAmount,
      //     userId: userInfo._id,
      //   });
      const order = {
        ...formData,
        cart,
        totalAmount,
        userId: userInfo._id,
      };
      const response = await placeOrder(order);
      // placeOrder({ cart, totalAmount, ...formData });
      console.log(response);
      if (response.data.acknowledged) {
        console.log('Order placed successfully');
        onClose();
        toast({
          variant: 'default',
          title: 'Hurray! 🎉',
          description: 'Order Placed Successfully',
          action: <ToastAction altText="Try again">OK!</ToastAction>,
          className: 'bg-green-500 text-white',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
        });
      }
    } else {
      setErrors(newErrors);
    }
    onClose();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">
              Order Summary
            </div>
            <div className="space-y-1">
              {cart.map(item => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{item.points * item.quantity} points</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 font-medium flex justify-between">
                <span>Total</span>
                <span>{totalAmount} points</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Abu Sayeed"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="test@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="01712345678"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">{errors.address}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

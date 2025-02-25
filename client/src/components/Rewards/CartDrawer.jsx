import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useToast } from '@/Hooks/use-toast';
import { Minus, Plus, X } from 'lucide-react';
import { ToastAction } from '../ui/toast';

export default function CartDrawer({
  cart,
  open,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  totalAmount,
  points,
}) {
  const { toast } = useToast();
  const checkPoints = () => {
    if (points < totalAmount) {
      //   onClose();
      toast({
        variant: 'destructive',
        title: 'Insufficient Points',
        description: "You don't have enough points to redeem these items.",
        action: <ToastAction altText="ok">ok</ToastAction>,
      });
    } else {
      onCheckout();
    }
  };
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="relative w-20 h-20">
                      <img
                        src={item.photo || '/placeholder.svg'}
                        alt={item.name}
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground line-through">
                        {item.price} tk.
                      </p>
                      <p className="text-lg font-semibold">
                        {item.points} points
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          onUpdateQuantity(
                            item.name,
                            Math.max(0, item.quantity - 1),
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          onUpdateQuantity(item.name, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(item.name)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{totalAmount} points</span>
            </div>
            <Button
              className="w-full"
              disabled={cart.length === 0}
              onClick={checkPoints}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

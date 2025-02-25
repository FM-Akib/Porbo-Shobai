import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { MdStars } from 'react-icons/md';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="animate-fadeIn">
      <Card className="overflow-hidden group">
        <div className="relative aspect-square">
          <img
            src={product.photo || '/placeholder.svg'}
            alt={product.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2">{product.category}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{product.name}</h3>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <p className="text-lg font-bold">{product.price} tk.</p>
              <p className="flex items-center gap-1 mt-2 font-semibold text-sm text-muted-foreground bg-emerald-400 px-2 py-1 rounded-md text-white">
                <MdStars />
                {product.points} points
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {product.available} available
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full gap-2" onClick={() => onAddToCart(product)}>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

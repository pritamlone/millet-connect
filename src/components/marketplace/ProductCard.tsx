import Image from "next/image";
import { ShoppingCart, Star, MapPin } from "lucide-react";

interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  farmer: string;
  location: string;
  image: string;
  rating: number;
  onBuy: () => void;
}

export default function ProductCard({
  name,
  category,
  price,
  farmer,
  location,
  image,
  rating,
  onBuy,
}: ProductCardProps) {
  return (
    <div className="bg-oatmeal rounded-3xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-3 py-1 bg-oatmeal/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-primary">{name}</h3>
          <div className="flex items-center text-secondary">
            <Star className="h-4 w-4 fill-secondary" />
            <span className="ml-1 text-xs font-bold">{rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-primary/60 text-xs mb-4">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{farmer}, {location}</span>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-xs text-primary/50 block">Price per kg</span>
            <span className="text-xl font-bold text-primary">₹{price}</span>
          </div>
          <button 
            onClick={onBuy}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-oatmeal rounded-2xl hover:bg-primary-dark transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

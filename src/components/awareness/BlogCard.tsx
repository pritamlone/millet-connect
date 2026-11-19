import Image from "next/image";
import { Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export default function BlogCard({
  title,
  category,
  excerpt,
  author,
  date,
  image,
  readTime,
}: BlogCardProps) {
  return (
    <div className="bg-oatmeal rounded-3xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 px-4 py-1 bg-secondary text-oatmeal rounded-full text-xs font-bold uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center space-x-4 text-xs text-primary/40 mb-4 font-bold">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-primary/60 text-sm leading-relaxed mb-8 line-clamp-3">
          {excerpt}
        </p>

        <Link href="#" className="inline-flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors group/link">
          <span>Read Full Article</span>
          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

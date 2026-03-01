import contentData from '@/data/content.json';
import ProductDetailClient from '@/app/products/[productName]/ProductDetailClient';

interface ProductType {
  name: string;
  description: string;
  image?: string;
  characteristics: string[];
  applications: string[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription?: string;
  image: string;
  categories?: string[];
  types?: ProductType[];
}

export default function PremixesPage() {
  const product = contentData.products.find(
    (p: Product) => p.name.toLowerCase() === 'premixes'
  );

  return <ProductDetailClient product={product} resolvedParams={{ productName: 'Premixes' }} />;
}

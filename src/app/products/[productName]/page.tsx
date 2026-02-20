import contentData from '@/data/content.json';
import ProductDetailClient from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    productName: string;
  }>;
}

interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription?: string;
  image: string;
  categories?: string[];
  types?: {
    name: string;
    description: string;
    characteristics: string[];
    applications: string[];
  }[];
}

// Generate static params for static export
export async function generateStaticParams() {
  return contentData.products.map((product) => ({
    productName: encodeURIComponent(product.name),
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  
  // URL parameters come in encoded, decode them for matching
  const productName = decodeURIComponent(resolvedParams.productName);
  
  // Find the product by name
  const product = contentData.products.find(
    (p: Product) => p.name.toLowerCase() === productName.toLowerCase()
  ) as Product | undefined;

  return <ProductDetailClient product={product} resolvedParams={resolvedParams} />;
}

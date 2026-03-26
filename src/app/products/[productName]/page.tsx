import contentData from '@/data/content.json';
import ProductDetailClient from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    productName: string;
  }>;
}

type ProductProp = React.ComponentProps<typeof ProductDetailClient>['product'];

// Generate static params for static export
export async function generateStaticParams() {
  return contentData.products.map((product) => ({
    productName: product.name,
  }));
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  
  // Decode route params before matching data
  const productName = safeDecodeURIComponent(resolvedParams.productName);
  
  // Find the product by name
  const product = contentData.products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  ) as ProductProp;

  return <ProductDetailClient product={product} resolvedParams={resolvedParams} />;
}

import contentData from '@/data/content.json';
import GradeDetailClient from './GradeDetailClient';

interface GradeDetailPageProps {
  params: Promise<{
    productName: string;
    gradeName: string;
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
    variants?: {
      name: string;
      description: string;
    }[];
    characteristics: string[];
    applications: string[];
  }[];
}

// Generate static params for static export
export async function generateStaticParams() {
  const params: any[] = [];
  
  contentData.products.forEach((product: Product) => {
    if (product.types && product.types.length > 0) {
      product.types.forEach((type) => {
        params.push({
          productName: encodeURIComponent(product.name),
          gradeName: encodeURIComponent(type.name),
        });
      });
    }
  });
  
  return params;
}

export default async function GradeDetailPage({ params }: GradeDetailPageProps) {
  const resolvedParams = await params;
  
  // URL parameters come in encoded, decode them for matching
  const productName = decodeURIComponent(resolvedParams.productName);
  const gradeName = decodeURIComponent(resolvedParams.gradeName);
  
  // Find the product by name
  const product = contentData.products.find(
    (p: Product) => p.name.toLowerCase() === productName.toLowerCase()
  ) as Product | undefined;

  // Find the grade/type within the product
  const grade = product?.types?.find(
    (t) => t.name.toLowerCase() === gradeName.toLowerCase()
  );

  return <GradeDetailClient product={product} grade={grade} resolvedParams={resolvedParams} />;
}

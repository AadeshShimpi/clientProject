import contentData from '@/data/content.json';
import GradeDetailClient from './GradeDetailClient';

interface GradeDetailPageProps {
  params: Promise<{
    productName: string;
    gradeName: string;
  }>;
}

type GradeDetailClientProps = React.ComponentProps<typeof GradeDetailClient>;
type ProductProp = GradeDetailClientProps['product'];
type GradeProp = GradeDetailClientProps['grade'];

// Generate static params for static export
export async function generateStaticParams() {
  const params: { productName: string; gradeName: string }[] = [];
  
  contentData.products.forEach((product) => {
    if (product.types && product.types.length > 0) {
      product.types.forEach((type) => {
        params.push({
          productName: product.name,
          gradeName: type.name,
        });
      });
    }
  });
  
  return params;
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function GradeDetailPage({ params }: GradeDetailPageProps) {
  const resolvedParams = await params;
  
  // Decode route params before matching data
  const productName = safeDecodeURIComponent(resolvedParams.productName);
  const gradeName = safeDecodeURIComponent(resolvedParams.gradeName);
  
  // Find the product by name
  const product = contentData.products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  ) as ProductProp;

  // Find the grade/type within the product
  const grade = product?.types?.find(
    (t) => t.name.toLowerCase() === gradeName.toLowerCase()
  ) as GradeProp;

  return <GradeDetailClient product={product} grade={grade} resolvedParams={resolvedParams} />;
}

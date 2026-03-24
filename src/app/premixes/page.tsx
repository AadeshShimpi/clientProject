import contentData from '@/data/content.json';
import ProductDetailClient from '@/app/products/[productName]/ProductDetailClient';

export default function PremixesPage() {
  type ProductProp = React.ComponentProps<typeof ProductDetailClient>['product'];

  const product = contentData.products.find(
    (p) => p.name.toLowerCase() === 'premixes'
  ) as ProductProp;

  return <ProductDetailClient product={product} resolvedParams={{ productName: 'Premixes' }} />;
}

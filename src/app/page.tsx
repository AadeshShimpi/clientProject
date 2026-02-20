import Hero, { SocialMediaBar } from '@/components/Hero';
import Features from '@/components/Features';
import Products from '@/components/Products';

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialMediaBar />
      <Features />
      <Products />
    </main>
  );
}

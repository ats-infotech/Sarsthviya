'use client';

import { useParams } from 'next/navigation';
import ViralCollections from '../home/viral-collection/viral-collection';
import ProductReview from './product-review/product-review';
import Product from './product/product';
import { products } from '@/constants/text-constants';

export default function ProductDetails() {
  const params = useParams();
  const product = products?.find(
    (item) => Number(item?.id) === Number(params?.id)
  );
  return (
    <div className='bg-background-secondary flex flex-col gap-25 pb-25 xl:pb-0'>
      {product && <Product product={product} />}
      {product && <ProductReview product={product} />}
      <ViralCollections />
    </div>
  );
}

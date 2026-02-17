'use client';

import { FileUploadField } from '@/components/file-uploader';
import { FormInput, FormTextarea } from '@/components/form-input';
import { Button } from '@/components/ui/button';
import Carousel from '@/components/ui/carousel';
import { Form } from '@/components/ui/form';
import { websiteText } from '@/constants/text-constants';
import { useWindowWidth } from '@/lib/useWindowWidth';
import { ReviewSchema } from '@/lib/validation/review.schema';
import { Product } from '@/types';
import { ReviewForm } from '@/types/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ProductReviewProps = {
  product: Product;
};

export default function ProductReview({ product }: ProductReviewProps) {
  const width = useWindowWidth();
  const ratingCounts = [1, 2, 3, 4, 5]
    .map((rating) => ({
      rating,
      count:
        product?.reviews?.filter((review) => review.rating === rating).length ||
        0
    }))
    .reverse();
  const [writeReview, setWriteReview] = useState(false);
  const defaultValues = {
    rating: 0,
    title: '',
    description: '',
    image: '',
    displayName: '',
    emailId: ''
  };
  const form = useForm<ReviewForm>({
    resolver: zodResolver(ReviewSchema),
    defaultValues
  });
  const { control, setValue, watch, reset, setError } = form;
  const ratingValue = watch('rating');

  const totalReviews = product?.reviews?.length || 0;

  const handleReview = () => {
    setWriteReview(!writeReview);
    reset();
  };

  const onSubmit = async (data: ReviewForm) => {
    if (ratingValue === 0) {
      setError('rating', { message: 'Rating is required' });
      return;
    }
    console.log(data, 'data');
    toast.success('Review submitted successfully');
    handleReview();
  };

  return (
    <>
      <div className='px-5 sm:px-8 xl:px-32.5'>
        <div className='bg-background-secondary relative rounded-[20px]'>
          <div
            className='pointer-events-none absolute inset-0 rounded-[10px] p-px'
            style={{
              background:
                'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'destination-out'
            }}
          />
          <div className='relative z-10 py-7 sm:px-16 [@media(min-width:1400px)]:px-26'>
            <p className='text-accent mb-12 text-center text-xl font-semibold sm:text-[26px]'>
              {websiteText?.customerReview}
            </p>
            <div className='flex flex-col items-center justify-between gap-10 lg:flex-row [@media(min-width:1400px)]:gap-16'>
              <div>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Math.floor(product.rating || 0) ? 'fill-text-septenary text-text-septenary' : 'text-text-septenary'}`}
                    />
                  ))}
                  <div>
                    <p className='text-accent ml-2.5 text-sm font-semibold'>
                      {product?.rating?.toFixed(1)} {websiteText?.outOf}{' '}
                      {websiteText?.five}
                    </p>
                  </div>
                </div>
                <p className='text-accent text-sm font-bold'>
                  {websiteText?.basedOn} {totalReviews} {websiteText?.review}
                </p>
              </div>
              <div className='border-text-secondary/30 lg:border-r lg:border-l lg:px-15 xl:px-20'>
                {ratingCounts.map(({ rating, count }) => (
                  <div
                    key={rating}
                    className='mb-1 flex items-center gap-2.5 last:mb-0'
                  >
                    <div className='flex gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < rating ? 'fill-text-septenary text-text-septenary' : 'text-text-septenary'}`}
                        />
                      ))}
                    </div>
                    <div className='border-accent/40 h-3.5 w-35 overflow-hidden border'>
                      <div
                        className='bg-accent h-full'
                        style={{
                          width:
                            totalReviews > 0
                              ? `${(count / totalReviews) * 100}%`
                              : '0%'
                        }}
                      />
                    </div>
                    <p className='text-text-secondary text-sm font-semibold'>
                      {count}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <Button
                  onClick={handleReview}
                  className='bg-accent text-text-tertiary h-10 w-52.5 rounded-sm text-base font-bold'
                >
                  {writeReview
                    ? websiteText?.cancelReview
                    : websiteText?.writeAReview}
                </Button>
              </div>
            </div>
            {writeReview && (
              <div className='border-text-secondary/30 mt-15.5 border-t pt-10.75'>
                <Form {...form}>
                  <form
                    className='mx-auto max-w-142'
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <p className='text-accent mb-5 text-center text-xl font-bold'>
                      {websiteText?.writeAReview}
                    </p>
                    <div className='flex flex-col gap-5.5'>
                      <div>
                        <p className='text-accent mb-2 text-center text-sm font-bold'>
                          {websiteText?.rating}
                        </p>
                        <div className='flex justify-center gap-0.5'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              onClick={() => {
                                setValue('rating', i + 1);
                                if (form.formState.errors.rating) {
                                  setError('rating', {});
                                }
                              }}
                              className={`h-3.5 w-3.5 cursor-pointer ${i < Number(watch('rating')) ? 'fill-text-septenary text-text-septenary' : 'text-text-septenary'}`}
                            />
                          ))}
                        </div>
                        {form.formState.errors.rating && (
                          <p className='mt-1 text-center text-sm text-red-500'>
                            {form.formState.errors.rating.message}
                          </p>
                        )}
                      </div>

                      <FormInput
                        control={control}
                        name={'title'}
                        label='Review Title (100)'
                        placeholder='Give your review a title'
                        labelClassName='text-sm font-bold text-accent text-center w-full justify-center'
                        inputClassName='placeholder:font-semibold placeholder:text-text-secondary placeholder:text-sm'
                      />

                      <FormTextarea
                        control={control}
                        label='Review content'
                        name='description'
                        placeholder='Start writing here...'
                        labelClassName='text-sm font-bold text-accent text-center w-full justify-center'
                        inputClassName='placeholder:font-semibold placeholder:text-text-secondary placeholder:text-sm'
                      />

                      <div className='flex flex-col items-center justify-center'>
                        <p className='text-accent mb-2 text-center text-sm font-bold'>
                          {websiteText?.pictureVideoOptional}
                        </p>
                        <FileUploadField
                          control={control}
                          name='image'
                          type='review'
                          classNameLabel='border-solid border-accent/40 px-0!'
                          className='mx-auto h-32 w-32 bg-transparent'
                        />
                      </div>

                      <FormInput
                        control={control}
                        name={'displayName'}
                        label='Display name (displayed publicly like John Smith )'
                        placeholder='Display name'
                        labelClassName='text-sm font-bold text-accent text-center w-full justify-center'
                        inputClassName='placeholder:font-semibold placeholder:text-text-secondary placeholder:text-sm'
                      />

                      <FormInput
                        control={control}
                        name={'emailId'}
                        label='Email Address'
                        placeholder='Your email address'
                        labelClassName='text-sm font-bold text-accent text-center w-full justify-center'
                        inputClassName='placeholder:font-semibold placeholder:text-text-secondary placeholder:text-sm'
                      />
                    </div>
                    <p className='text-text-secondary mt-7.5 text-center text-sm font-bold'>
                      {websiteText?.howWeUseYourData}
                    </p>
                    <div className='mt-6 flex flex-wrap justify-center gap-5 [@media(min-width:526px)]:gap-16'>
                      <Button
                        className='border-accent/40 text-accent h-10 w-52.75 border text-base font-bold'
                        onClick={handleReview}
                      >
                        {websiteText?.cancelReview}
                      </Button>
                      <Button className='bg-accent text-text-tertiary h-10 w-52.75 text-base font-bold'>
                        {websiteText?.submitReview}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='mx-auto mt-11.25 w-fit'>
        <Carousel
          slidesToShow={width < 900 ? 1 : width < 1300 ? 2 : 3}
          slideWidth={width < 500 ? 210 : 378}
          gap={20}
          showDots={false}
          showArrows={true}
        >
          {product?.reviews?.map((items, i) => {
            return (
              <div
                key={i}
                className='bg-background-secondary relative h-71.5 w-52.5 rounded-[20px] p-6 [@media(min-width:500px)]:w-94.5'
              >
                <div
                  className='pointer-events-none absolute inset-0 rounded-[10px] p-px'
                  style={{
                    background:
                      'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'destination-out'
                  }}
                />
                <div className='relative z-10'>
                  <div className='flex items-center justify-between'>
                    <div className='flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < items?.rating ? 'fill-text-septenary text-text-septenary' : 'text-text-septenary'}`}
                        />
                      ))}
                    </div>
                    <p className='text-text-secondary text-xs font-semibold'>
                      {items?.date}
                    </p>
                  </div>
                  <div className='mt-2.75 flex gap-2.25'>
                    <Image
                      alt='profile'
                      src={'/assets/images/profile.svg'}
                      height={36}
                      width={36}
                    />
                    <p className='text-accent text-sm font-semibold'>
                      {items?.userName}
                    </p>
                    {items?.verified && (
                      <div className='text-text-primary bg-accent flex h-4.75 w-14.25 items-center justify-center rounded-sm text-xs'>
                        {websiteText?.verified}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className='text-accent py-3 text-sm font-bold'>
                      {items?.title}
                    </p>
                    <p className='text-text-secondary text-sm'>
                      {items?.description}
                    </p>
                  </div>
                  <div className='bg-card-primary mt-5 rounded-xl px-3.5 py-1.5'>
                    <p className='text-accent text-sm font-normal'>
                      {'>>'}{' '}
                      <span className='font-bold'>{websiteText?.offMint}</span>{' '}
                      <span className='text-text-secondary'>
                        {websiteText?.replied}:
                      </span>
                    </p>
                    <p className='text-text-secondary text-sm'>
                      {items?.replied}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

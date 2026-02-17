'use client';

import { FormInput } from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { websiteText } from '@/constants/text-constants';
import { ReturnExchangeSchema } from '@/lib/validation/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
interface ReturnExchangeField {
  orderNumber: string;
  phoneOrEmail: string;
}

export default function ReturnExchange() {
  const form = useForm<ReturnExchangeField>({
    resolver: zodResolver(ReturnExchangeSchema),
    defaultValues: {
      orderNumber: '',
      phoneOrEmail: ''
    }
  });

  const { control } = form;

  const onSubmit = (data: ReturnExchangeField) => {
    console.log('Form Data:', data);
  };
  return (
    <div>
      <div className='my-10 flex justify-center px-10'>
        {/* Gradient border */}
        <div className='relative w-130 p-px'>
          <div
            className='pointer-events-none absolute inset-0 rounded-xl'
            style={{
              background:
                'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)'
            }}
          />

          {/* Content */}
          <div className='bg-background-secondary relative rounded-xl p-10'>
            <div>
              <div className='flex flex-col gap-5 lg:gap-7'>
                <h3 className='text-center text-xl font-bold lg:text-4xl'>
                  {websiteText?.returntext}
                </h3>
                <p className='text-accent text-center text-[12px] lg:text-sm'>
                  {websiteText?.returndescription}
                </p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='mt-7'>
                  <div className='mb-5 flex flex-col gap-3'>
                    <FormInput
                      label=''
                      name='orderNumber'
                      control={control}
                      inputClassName='p-5 lg:px-3 lg:py-1 font-semibold rounded!'
                      placeholder='Order Number'
                    />

                    <FormInput
                      label=''
                      name='phoneOrEmail'
                      control={control}
                      inputClassName='p-5 lg:px-3 lg:py-1 font-semibold rounded!'
                      placeholder='Email or Phone'
                    />
                  </div>

                  <Button
                    type='submit'
                    className='bg-accent text-text-tertiary w-full py-5 lg:py-6'
                  >
                    {websiteText?.findyouroder}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

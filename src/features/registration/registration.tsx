'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/form-input';
import { RegistrationSchema } from '@/lib/validation/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
interface RegistrationForm {
  number: string;
}

export default function Registration() {
  const form = useForm<RegistrationForm>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      number: ''
    }
  });

  const { control } = form;

  const onSubmit = (data: RegistrationForm) => {
    console.log('Form Data:', data);
  };

  return (
    <div className='my-16 flex w-full flex-col gap-10 px-4 sm:px-8 md:px-12 lg:flex-row lg:gap-0 lg:px-0'>
      {/* ================= FORM SECTION ================= */}
      <div className='order-1 flex w-full justify-center lg:order-2 lg:w-1/2'>
        <div className='w-full max-w-md'>
          {/* Gradient Border Wrapper */}
          <div className='bg-background-secondary relative rounded-xl p-6 sm:p-10 lg:p-16'>
            {/* Gradient Border Layer */}
            <div
              className='pointer-events-none absolute inset-0 rounded-xl p-px'
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

            {/* Content */}
            <div className='relative z-10'>
              <h3 className='text-accent text-center text-3xl font-semibold sm:text-4xl'>
                Create Account
              </h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='mt-8 sm:mt-10'
                >
                  <FormInput
                    label=''
                    name='number'
                    control={control}
                    placeholder='Phone number'
                    className='text-text-secondary mb-5 h-10'
                  />

                  <Button
                    type='submit'
                    className='bg-accent text-text-tertiary mt-1 h-12 w-full'
                  >
                    Register Now
                  </Button>
                </form>
              </Form>

              {/* Already account */}
              <div className='mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-10'>
                <p className='text-center'>Already have an account?</p>

                <Button
                  variant='ghost'
                  className='bg-transparent! p-0 text-[16px] font-semibold'
                >
                  Log in
                </Button>
              </div>

              <p className='my-5 text-center text-[12px] font-semibold'>Or</p>

              {/* Social Icons */}
              <div className='my-5 flex justify-center gap-5'>
                <Image
                  src='/assets/images/registration/iphoneIcon.svg'
                  alt='iphone'
                  width={40}
                  height={40}
                />

                <Image
                  src='/assets/images/registration/Googleicon.svg'
                  alt='google'
                  width={40}
                  height={40}
                />

                <Image
                  src='/assets/images/registration/facebookIcons.svg'
                  alt='facebook'
                  width={40}
                  height={40}
                />
              </div>

              {/* Terms */}
              <p className='text-accent text-center text-sm leading-5'>
                by clicking register now. you agree to{' '}
                <span className='text-text-secondary'>
                  terms & conditions and privacy policy.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= IMAGE SECTION ================= */}
      <div className='order-2 mb-10 flex w-full justify-center lg:order-1 lg:w-1/2'>
        <div className='flex w-full max-w-lg justify-center gap-3 sm:gap-6'>
          {/* Image 1 */}
          <div className='flex flex-col'>
            <h4 className='text-lg font-semibold uppercase sm:text-xl'>
              Select
            </h4>
            <Image
              src='/assets/images/registration/firstImage.png'
              alt='select'
              width={184}
              height={300}
              className='h-40 w-24 object-cover object-top sm:h-52 sm:w-32 lg:h-75 lg:w-46'
            />
          </div>

          {/* Image 2 */}
          <div className='flex translate-y-10 flex-col sm:translate-y-16 lg:translate-y-32'>
            <h4 className='text-lg font-semibold uppercase sm:text-xl'>Buy</h4>

            <Image
              src='/assets/images/registration/secondImage.png'
              alt='buy'
              width={201}
              height={289}
              className='h-36 w-24 object-cover object-center sm:h-48 sm:w-36 lg:h-72.25 lg:w-50.25'
            />
          </div>

          {/* Image 3 */}
          <div className='flex translate-y-20 flex-col sm:translate-y-28 lg:translate-y-60'>
            <h4 className='text-lg font-semibold uppercase sm:text-xl'>Were</h4>

            <Image
              src='/assets/images/registration/thirdImage.png'
              alt='were'
              width={139}
              height={237}
              className='h-32 w-20 object-cover object-center sm:h-44 sm:w-28 lg:h-59.25 lg:w-39.75'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

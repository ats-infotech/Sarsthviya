'use client';
import { footerItems, websiteText } from '@/constants/text-constants';
import Image from 'next/image';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../form-input';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type EmailValues = {
  email: string;
};

export default function Footer() {
  const form = useForm<EmailValues>({
    defaultValues: {
      email: ''
    }
  });
  const [openMenu, setOpenMenu] = useState('');
  const pathName = usePathname();
  const showFooter = !pathName.includes('/profile');

  return (
    showFooter && (
      <div className='bg-background-secondary relative bottom-0 overflow-hidden'>
        <div className='absolute h-full'>
          <Image
            src={'/assets/images/footer-image-2.png'}
            alt='logo'
            width={80}
            height={44}
            unoptimized
            className='h-full w-full'
          />
        </div>
        <div className='absolute right-0 h-full'>
          <Image
            src={'/assets/images/footer-image.png'}
            alt='logo'
            width={80}
            height={44}
            unoptimized
            className='h-full w-full'
          />
        </div>
        <div className='relative z-10 px-5 pb-12.5 lg:px-22 lg:pb-23.5 xl:pt-37.5 xl:pb-64 [@media(min-width:1240px)]:px-37 [@media(min-width:1440px)]:px-57.5'>
          <div className='flex flex-col md:flex-row lg:gap-7.5 [@media(min-width:1440px)]:gap-15'>
            <div className='mb-8.5 w-full md:mb-0 md:w-62'>
              <div>
                <Image
                  src={'/assets/images/logo.png'}
                  alt='logo'
                  width={80}
                  height={44}
                  className='mx-auto md:mx-0'
                />
              </div>
              <p className='text-text-secondary mx-auto mt-5 max-w-62 text-center text-[10px] font-semibold md:mx-0 md:text-start md:text-xs'>
                {websiteText?.footerText}
              </p>
            </div>
            <div className='flex w-full flex-col md:w-[calc(100%-248px)] md:flex-row md:justify-between lg:justify-end lg:gap-17.5 [@media(min-width:1440px)]:gap-30'>
              {footerItems?.length > 0 &&
                footerItems.map((items) => {
                  const isOpen = openMenu === items.title;
                  return (
                    <div
                      key={items?.title}
                      className='pb-6 md:max-w-47.5 md:pb-0'
                    >
                      <div
                        className='flex items-center justify-between'
                        onClick={() =>
                          setOpenMenu((prev) =>
                            prev === items.title ? '' : items.title
                          )
                        }
                      >
                        <p className='text-accent text-base font-bold md:mb-5'>
                          {items?.title}
                        </p>
                        <Button
                          type='button'
                          variant='ghost'
                          className='block h-auto p-0 md:hidden'
                          onClick={() =>
                            setOpenMenu((prev) =>
                              prev === items.title ? '' : items.title
                            )
                          }
                        >
                          {isOpen ? (
                            <Minus
                              className={`text-accent transition-transform duration-200`}
                            />
                          ) : (
                            <Plus
                              className={`text-accent transition-transform duration-200`}
                            />
                          )}
                        </Button>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 md:mt-0 md:max-h-none md:opacity-100 ${isOpen ? 'mt-2 ml-3 max-h-96 opacity-100' : 'mt-0 max-h-0 opacity-0'} md:block`}
                      >
                        {items?.subchild?.length > 0 &&
                          items.subchild.map((links) => {
                            return (
                              <div className='mb-1.5' key={links?.title}>
                                {links?.menuTitle && (
                                  <p className='text-text-secondary text-base font-bold'>
                                    {links?.menuTitle}
                                  </p>
                                )}

                                <Link
                                  href={links?.url}
                                  className='text-text-secondary text-xs font-semibold'
                                >
                                  {links?.title}
                                </Link>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <p className='text-accent mt-6 text-center text-xl font-bold lg:mt-12.5'>
              {websiteText?.newsletterSignUp}
            </p>
            <FormProvider {...form}>
              <form className='mt-5 flex [@media(min-width:400px)]:justify-center'>
                <FormInput
                  control={form.control}
                  name='email'
                  label=''
                  placeholder='Enter Your Email Address'
                  className='h-12 w-full [@media(min-width:400px)]:w-91.5!'
                  inputClassName='h-12 text-xs bg-accent font-semibold text-text-tertiary placeholder:text-text-tertiary/80 pr-10'
                  isSent={true}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    )
  );
}

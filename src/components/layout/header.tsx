'use client';
import { headerItems } from '@/constants/text-constants';
import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User
} from 'lucide-react';
import Image from 'next/image';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../form-input';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { IconsString } from '../icons';
import { useSidebar } from '../ui/sidebar';

type FilterValues = {
  search: string;
};

export default function Header() {
  const [searchQuery, setSearchQuery] = useQueryState('search');

  const form = useForm<FilterValues>({
    defaultValues: {
      search: searchQuery ?? ''
    }
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setSearchQuery(values.search || null);
    });
    return () => subscription.unsubscribe();
  }, [form, setSearchQuery]);

  useEffect(() => {
    form.reset({
      search: searchQuery ?? ''
    });
  }, [searchQuery, form]);
  const { setOpenMobile, isMobile, toggleSidebar, openMobile } = useSidebar();
  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(true);
    } else {
      toggleSidebar();
    }
  };

  return (
    <>
      <header className='bg-background-secondary relative flex h-23.5 items-center justify-between overflow-visible px-5 py-5 xl:px-32.5! [@media(min-width:400px)]:px-10'>
        <div className='flex gap-4.5'>
          <div className='hidden gap-7.5 lg:flex'>
            {headerItems.map((items) => {
              const hasDropdown = items?.subchild && items.subchild.length > 0;
              return (
                <div
                  key={items?.title}
                  className={`relative cursor-pointer ${hasDropdown ? 'group' : ''}`}
                >
                  <Link
                    href={items?.url}
                    className='text-accent hover:border-primary group-hover:border-primary relative pb-1 text-sm font-semibold group-hover:border-b-2 hover:border-b-2'
                  >
                    {items?.title}
                    <div className='absolute top-5.5 hidden w-full justify-center group-hover:flex'>
                      <Icon
                        icon={IconsString?.polygon}
                        className='rotate-180'
                      />
                    </div>
                  </Link>

                  {/* Invisible hover bridge - solves the gap issue */}
                  {hasDropdown && (
                    <div className='invisible absolute top-full left-0 z-20 h-50 w-200 group-hover:visible [@media(min-width:1330px)]:w-265'></div>
                  )}

                  {hasDropdown && (
                    <div className='invisible absolute top-20 z-20 w-200 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 [@media(min-width:1330px)]:w-265'>
                      <div className='rounded-4xl bg-white p-7.5'>
                        <div className='grid grid-cols-2 gap-x-20'>
                          {items?.subchildTitle &&
                            items?.subchildTitle?.map((subtitle) => {
                              return (
                                <p
                                  className='text-accent mb-4.5 px-5.5 text-base font-semibold'
                                  key={subtitle}
                                >
                                  {subtitle}
                                </p>
                              );
                            })}
                        </div>

                        <div className='grid grid-cols-2 gap-x-5 gap-y-3 [@media(min-width:1330px)]:gap-x-20'>
                          {items?.subchild &&
                            items?.subchild.map((sub) => (
                              <div
                                key={sub?.menuTitle}
                                className='hover:bg-card-primary group/item flex max-w-115 items-center justify-between rounded-3xl px-5.5 py-5'
                              >
                                <div className='flex items-center gap-5'>
                                  <div className='border-accent-quaternary/20 flex h-12 w-12 items-center justify-center rounded-xl border bg-white shadow-[0px_6px_18px_rgba(16,16,16,0.14)]'>
                                    {sub?.icon && (
                                      <Image
                                        src={sub.icon}
                                        alt='sub-type'
                                        width={24}
                                        height={24}
                                      />
                                    )}
                                  </div>

                                  <div>
                                    <h6 className='text-accent text-base font-semibold'>
                                      {sub?.menuTitle}
                                    </h6>
                                    <p className='text-text-secondary text-[10px] font-medium'>
                                      {sub?.title}
                                    </p>
                                  </div>
                                </div>

                                {/* Chevron only on row hover */}
                                <div className='opacity-0 transition group-hover/item:opacity-100'>
                                  <ChevronRight />
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className='block w-full lg:hidden'>
            {!openMobile && (
              <Menu
                onClick={handleMenuClick}
                className='text-text-senary h-4.5 w-4.5'
              />
            )}
          </div>
          <div className='block md:hidden'>
            <Search className='text-text-senary h-4.5 w-4.5' />
          </div>
        </div>
        <div className='block md:hidden lg:block'>
          <Image
            src={'/assets/images/logo.png'}
            alt='logo'
            height={56}
            width={100}
          />
        </div>
        <div className='flex items-center gap-5'>
          <div className='hidden pr-10 md:block lg:hidden'>
            <Image
              src={'/assets/images/logo.png'}
              alt='logo'
              height={56}
              width={100}
            />
          </div>
          <FormProvider {...form}>
            <form className='hidden md:block'>
              <div>
                <FormInput
                  control={form.control}
                  name='search'
                  label=''
                  placeholder='Search Your Keywords'
                  className='w-71 flex-1'
                  inputClassName='pl-10 text-xs bg-accent text-text-tertiary placeholder:text-text-tertiary rounded-full'
                  isSearch={true}
                />
              </div>
            </form>
          </FormProvider>
          <Heart className='text-text-senary h-4.5 w-4.5' />
          <ShoppingCart className='text-text-senary h-4.5 w-4.5' />
          <User className='text-text-senary hidden h-4.5 w-4.5 md:block' />
        </div>
      </header>
    </>
  );
}

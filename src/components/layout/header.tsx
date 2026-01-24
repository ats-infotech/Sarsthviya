'use client'
import { headerItems } from "@/constants/text-constants";
import { ChevronRight, Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../form-input";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { IconsString } from "../icons";

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

  return (
    <header className='h-23.5 bg-background-secondary flex items-center py-5 px-5 [@media(min-width:400px)]:px-10 xl:px-32.5! justify-between relative overflow-visible'>
      <div className="flex gap-4.5">
        <div className="hidden lg:flex gap-7.5">
          {headerItems.map((items) => {
            const hasDropdown = items?.subchild && items.subchild.length > 0;
            return (
              <div
                key={items?.title}
                className={`relative cursor-pointer ${hasDropdown ? "group" : ""}`}
              >
                <Link 
                  href={items?.url} 
                  className="text-sm font-semibold relative text-accent hover:border-b-2 hover:border-primary group-hover:border-b-2 group-hover:border-primary pb-1"
                >
                  {items?.title}
                  <div className="hidden absolute group-hover:flex justify-center w-full top-5.5">
                    <Icon icon={IconsString?.polygon} className="rotate-180" />
                  </div>
                </Link>

                {/* Invisible hover bridge - solves the gap issue */}
                {hasDropdown && (
                  <div className="absolute top-full z-20 left-0 w-265 h-50 invisible group-hover:visible"></div>
                )}

                {hasDropdown && (
                  <div
                    className="absolute z-20 top-20 w-265
                     opacity-0 invisible
                     group-hover:opacity-100 group-hover:visible
                     transition-all duration-200"
                  >
                    <div className="bg-white p-7.5 rounded-4xl">
                      <div className="grid grid-cols-2 gap-x-20" >
                        {items?.subchildTitle && items?.subchildTitle?.map((subtitle) => {
                          return (
                            <p className="text-base px-5.5 font-semibold text-accent mb-4.5" key={subtitle}>{subtitle}</p>
                          )
                        })}
                      </div>

                      <div className="grid grid-cols-2 gap-x-20 gap-y-3">
                        {items?.subchild && items?.subchild.map((sub) => (
                          <div
                            key={sub?.menuTitle}
                            className="py-5 px-5.5 flex items-center justify-between
                             rounded-3xl hover:bg-card-primary group/item"
                          >
                            <div className="flex items-center gap-5">
                              <div className="h-12 w-12 border border-accent-quaternary/20 shadow-[0px_6px_18px_rgba(16,16,16,0.14)] flex justify-center items-center bg-white rounded-xl">
                                {sub?.icon && (
                                  <Image src={sub.icon} alt="sub-type" width={24} height={24} />
                                )}
                              </div>

                              <div>
                                <h6 className="text-base font-semibold text-accent">
                                  {sub?.menuTitle}
                                </h6>
                                <p className="text-[10px] font-medium text-text-secondary">
                                  {sub?.title}
                                </p>
                              </div>
                            </div>

                            {/* Chevron only on row hover */}
                            <div className="opacity-0 group-hover/item:opacity-100 transition">
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
        <div className="block w-full lg:hidden">
          <Menu className="h-4.5 w-4.5 text-text-senary" />
        </div>
        <div className="block md:hidden">
          <Search className="h-4.5 w-4.5 text-text-senary" />
        </div>
      </div>
      <div className="block md:hidden lg:block">
        <Image
          src={'/assets/images/logo.png'}
          alt="logo"
          height={56}
          width={100}
        />
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden md:block pr-10 lg:hidden">
          <Image
            src={'/assets/images/logo.png'}
            alt="logo"
            height={56}
            width={100}
          />
        </div>
        <FormProvider {...form}>
          <form className="hidden md:block">
            <div>
              <FormInput
                control={form.control}
                name='search'
                label=''
                placeholder='Search Your Keywords'
                className='flex-1 w-71'
                inputClassName="pl-10 text-xs bg-accent text-text-tertiary placeholder:text-text-tertiary rounded-full"
                isSearch={true}
              />
            </div>
          </form>
        </FormProvider>
        <Heart className="h-4.5 w-4.5 text-text-senary" />
        <ShoppingCart className="h-4.5 w-4.5 text-text-senary" />
        <User className="hidden h-4.5 w-4.5 text-text-senary md:block" />
      </div>
    </header>
  );
}
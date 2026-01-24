'use client'
import { footerItems, websiteText } from "@/constants/text-constants";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../form-input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type EmailValues = {
    email: string;
};

export default function Footer() {
    const form = useForm<EmailValues>({
        defaultValues: {
            email: ''
        }
    });
    const [openMenu, setOpenMenu] = useState('')

    return (
        <div className="relative overflow-hidden bg-background-secondary bottom-0">
            <div className="absolute h-full">
                <Image
                    src={'/assets/images/footer-image-2.png'}
                    alt="logo"
                    width={80}
                    height={44}
                    unoptimized
                    className="h-full w-full"
                />
            </div>
            <div className="absolute right-0 h-full">
                <Image
                    src={'/assets/images/footer-image.png'}
                    alt="logo"
                    width={80}
                    height={44}
                    unoptimized
                    className="h-full w-full"
                />
            </div>
            <div className="px-5 pb-12.5 lg:px-22 lg:pb-23.5 [@media(min-width:1240px)]:px-37 [@media(min-width:1440px)]:px-57.5 xl:pt-37.5 xl:pb-64 relative z-10">
                <div className="flex flex-col md:flex-row lg:gap-7.5 [@media(min-width:1440px)]:gap-15">
                    <div className="w-full mb-8.5 md:w-62 md:mb-0">
                        <div>
                            <Image
                                src={'/assets/images/logo.png'}
                                alt="logo"
                                width={80}
                                height={44}
                                className="mx-auto md:mx-0"
                            />
                        </div>
                        <p className="max-w-62 text-center mx-auto md:text-start md:mx-0 text-text-secondary text-[10px] md:text-xs font-semibold mt-5">{websiteText?.footerText}</p>
                    </div>
                    <div className="flex flex-col w-full md:flex-row md:justify-between lg:justify-end lg:gap-17.5 [@media(min-width:1440px)]:gap-30 md:w-[calc(100%-248px)]">
                        {footerItems?.length > 0 &&
                            footerItems.map((items) => {
                                const isOpen = openMenu === items.title;
                                return (
                                    <div key={items?.title} className="md:max-w-47.5 pb-6 md:pb-0">
                                        <div className="flex items-center justify-between">
                                            <p className="md:mb-5 text-accent text-base font-bold">
                                                {items?.title}
                                            </p>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="block md:hidden p-0 h-auto"
                                                onClick={() =>
                                                    setOpenMenu((prev) => (prev === items.title ? "" : items.title))
                                                }
                                            >
                                                {isOpen ? <Minus className={`text-accent transition-transform duration-200`} /> : <Plus className={`text-accent transition-transform duration-200`} />}
                                            </Button>
                                        </div>

                                        <div
                                            className={`overflow-hidden transition-all duration-300 md:max-h-none md:opacity-100 md:mt-0 ${isOpen ? "ml-3 max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"} md:block`}
                                        >
                                            {items?.subchild?.length > 0 &&
                                                items.subchild.map((links) => {
                                                    return (
                                                        <div className="mb-1.5" key={links?.title}>
                                                            {links?.menuTitle && (
                                                                <p className="text-base font-bold text-text-secondary">
                                                                    {links?.menuTitle}
                                                                </p>
                                                            )}

                                                            <Link
                                                                href={links?.url}
                                                                className="text-xs text-text-secondary font-semibold"
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
                    <p className="text-xl font-bold text-accent text-center mt-6 lg:mt-12.5">Newsletter Sign Up</p>
                    <FormProvider {...form}>
                        <form className="flex [@media(min-width:400px)]:justify-center mt-5">
                            <FormInput
                                control={form.control}
                                name="email"
                                label=''
                                placeholder='Enter Your Email Address'
                                className='w-full [@media(min-width:400px)]:w-91.5! h-12'
                                inputClassName="h-12 text-xs bg-accent font-semibold text-text-tertiary placeholder:text-text-tertiary/80 pr-10"
                                isSent={true}
                            />
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}
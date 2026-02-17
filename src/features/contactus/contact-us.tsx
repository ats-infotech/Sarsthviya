'use client';

import { FormInput, FormTextarea } from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { websiteText } from '@/constants/text-constants';
import { useWindowWidth } from '@/lib/useWindowWidth';
import { ContactUsSchema } from '@/lib/validation/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  TwitterIcon
} from 'lucide-react';
import { useForm } from 'react-hook-form';
interface ContactUsForm {
  name: string;
  email: string;
  phone: string;
  msg: string;
}

export default function ContactUs() {
  const width = useWindowWidth();
  const form = useForm<ContactUsForm>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      msg: ''
    }
  });

  const { control } = form;

  const onSubmit = (data: ContactUsForm) => {
    console.log('Form Data:', data);
  };
  return (
    <div className='my-12 flex items-center justify-center p-8'>
      <div className='grid w-280.5 grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-12'>
        {/* contact form */}
        <div
          className='relative order-1 rounded-3xl p-px lg:order-2'
          style={{
            background:
              width < 1024
                ? 'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)'
                : ''
          }}
        >
          <div className='rounded-3xl bg-white p-8 lg:p-0'>
            <div className='mb-5 block lg:hidden'>
              <h2 className='text-accent pb-3 text-4xl font-bold'>
                {websiteText?.contactUs}
              </h2>
              <p className='text-accent text-sm leading-7'>
                {websiteText?.contactUsDescription}
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='bg-background-secondary'
              >
                <FormInput
                  label=''
                  name='name'
                  control={control}
                  placeholder='Name'
                  className='mb-5'
                  inputClassName='text-text-secondary rounded! px-5 py-6 font-semibold'
                />
                <FormInput
                  label=''
                  name='email'
                  control={control}
                  placeholder='E-Mail'
                  className='mb-5'
                  inputClassName='text-text-secondary rounded! px-5 py-6 font-bold'
                />
                <FormInput
                  label=''
                  name='phone'
                  control={control}
                  placeholder='Phone'
                  className='mb-5'
                  inputClassName='text-text-secondary rounded! px-5 py-6 font-bold'
                />
                <FormTextarea
                  label=''
                  name='msg'
                  control={control}
                  placeholder='Message'
                  className='mb-7'
                  inputClassName='text-text-secondary rounded! px-5 py-6 font-bold'
                />

                <Button
                  type='submit'
                  className='bg-accent text-text-tertiary w-full rounded py-6'
                >
                  {websiteText?.submit}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        {/* contact text */}
        <div className='order-2 w-full lg:order-1'>
          <div className='hidden lg:block'>
            <h2 className='text-accent pb-3 text-4xl font-bold'>
              {websiteText?.contactUs}
            </h2>
            <p className='text-accent text-xl leading-7'>
              {websiteText?.contactUsDescription}
            </p>
          </div>
          <div className='flex flex-col gap-1 pb-8 lg:gap-2.5 lg:py-5'>
            <p className='text-text-secondary flex items-center justify-center gap-5 font-semibold lg:justify-start'>
              <Phone className='text-accent h-4 w-4' />{' '}
              {websiteText?.contactUsNumber}
            </p>
            <p className='text-text-secondary flex items-center justify-center gap-5 pl-6 font-semibold lg:justify-start lg:pl-0'>
              <Mail className='text-accent h-4 w-4' />
              {websiteText?.contactUsMail}
            </p>
          </div>
          <div className='mb-5 flex items-center justify-center gap-2 lg:justify-start'>
            <div className='bg-background-primary text-text-primary flex h-8 w-8 items-center justify-center rounded-full'>
              <Instagram className='h-3 w-3' />
            </div>
            <div className='bg-background-primary text-text-primary flex h-8 w-8 items-center justify-center rounded-full'>
              <TwitterIcon className='h-3 w-3' />
            </div>
            <div className='bg-background-primary text-text-primary flex h-8 w-8 items-center justify-center rounded-full'>
              <Facebook className='h-3 w-3' />
            </div>
            <div className='bg-background-primary text-text-primary flex h-8 w-8 items-center justify-center rounded-full'>
              <Linkedin className='h-3 w-3' />
            </div>
          </div>
          <div
            className='relative w-full p-px lg:w-105'
            style={{
              background:
                'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)'
            }}
          >
            <div
              className='bg-background-secondary p-7 lg:p-10'
              style={{
                mask: 'linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0)'
              }}
            >
              <h4 className='text-accent mb-2 text-xs leading-4 font-bold'>
                {websiteText?.contactUsAddressTitle}
              </h4>
              <p className='text-text-secondary text-sm leading-5'>
                {websiteText?.contactUsAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

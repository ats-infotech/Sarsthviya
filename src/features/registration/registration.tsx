import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Registration() {
  return (
    <div className='flex h-159.25 w-full gap-5 px-10'>
      {/* image contain */}
      <div className='w-full'>
        <div className='flex h-130 w-141! gap-3'>
          <div>
            <h4 className='text-xl font-semibold uppercase'>Select</h4>
            <Image
              src={'/assets/images/registration/firstImage.png'}
              alt={'select'}
              unoptimized
              width={184}
              height={300}
              className='h-75 w-46 object-cover object-top'
            />
          </div>
          <div className='translate-y-32'>
            <h4 className='text-xl font-semibold uppercase'>Buy</h4>
            <Image
              src={'/assets/images/registration/secondImage.png'}
              alt={'select'}
              unoptimized
              height={289}
              width={201}
              className='h-72.25 w-50.25 object-cover object-center'
            />
          </div>
          <div className='translate-y-60'>
            <h4 className='text-xl font-semibold uppercase'>Were</h4>
            <Image
              src={'/assets/images/registration/thirdImage.png'}
              alt={'select'}
              unoptimized
              height={237}
              width={139}
              className='h-59.25 w-39.75 object-cover object-center'
            />
          </div>
        </div>
      </div>
      {/* form contain */}
      <div className='w-full p-10'>
        <div className='border-text-primary mx-auto w-141 rounded-xl border p-5'>
          <div>
            <h3 className='text-accent text-center text-4xl font-semibold'>
              Create Account
            </h3>
            <form className='mt-10'>
              <Input
                placeholder='Phone number'
                className='text-text-secondary mb-5 h-10'
              />
              <Button className='bg-accent text-text-tertiary h-12 w-full'>
                Register Now
              </Button>
            </form>
            <div className='mt-2 flex justify-center gap-14'>
              <p className='pt-1.5'>Already have an account?</p>
              <Button
                variant={'ghost'}
                className='p-0! text-[16px] font-semibold'
              >
                Log in
              </Button>
            </div>
          </div>
          <p className='my-5 text-center text-[12px] font-semibold'>Or</p>
          <div>
            <div className='my-5 flex justify-center gap-2'>
              <Image
                src={'/assets/images/registration/iphoneIcon.svg'}
                height={35}
                width={35}
                alt='iphone'
              />
              <Image
                src={'/assets/images/registration/Googleicon.svg'}
                height={35}
                width={35}
                alt='iphone'
              />
              <Image
                src={'/assets/images/registration/facebookIcons.svg'}
                height={35}
                width={35}
                alt='iphone'
              />
            </div>
            <p className='text-accent text-center'>
              by clicking register now. you agree to{' '}
              <span className='text-text-secondary'>
                terms & conditions and privacy policy.
              </span>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

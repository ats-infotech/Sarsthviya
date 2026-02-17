import { Card, CardContent } from '@/components/ui/card';
// import FileSvg from '../../../public/assets/pdf-icon.svg';
import Image from 'next/image';

type FileCardProps = {
  name: string;
  type: 'pdf' | 'txt' | 'xlsx' | '';
  date?: string;
};

export default function FileCard({ name, type, date }: FileCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return <Image src={'FileSvg'} className='h-10 w-10' alt='file' />;
      case 'txt':
        return <Image src={'FileSvg'} className='h-10 w-10' alt='file' />;
      case 'xlsx':
        return <Image src={'FileSvg'} className='h-10 w-10' alt='file' />;
      default:
        return <Image src={'FileSvg'} className='h-10 w-10' alt='file' />;
    }
  };

  return (
    <Card className='flex items-center rounded-2xl border-none bg-transparent! py-0 shadow-none transition'>
      <CardContent className='flex items-center gap-4 p-0'>
        <div className='shrink-0'>{getIcon()}</div>
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-gray-900'>{name}</span>
          <span className='text-xs text-gray-500'>{date}</span>
        </div>
      </CardContent>
    </Card>
  );
}

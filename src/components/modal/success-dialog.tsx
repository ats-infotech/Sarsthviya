import { Icon } from '@iconify/react';
import { IconsString } from '../icons';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';

interface SuccessDialogProps {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
}

export default function SuccessDialog({
  title,
  description,
  open,
  onClose
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className='mt-6 flex flex-col items-center justify-center'>
          <Icon
            icon={IconsString?.outlineCircleTick}
            height={94}
            width={94}
            className='text-success'
          />
          <h5 className='text-primary-950 mt-6 text-center text-base font-bold'>
            {title}
          </h5>
          <h6 className='text-primary-950 mt-4 mb-5 text-center text-sm font-normal'>
            {description}
          </h6>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

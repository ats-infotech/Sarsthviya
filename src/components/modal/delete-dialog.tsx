import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type DeleteDialogProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  itemName?: string;
  onConfirm: () => void | Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  id?: string;
  disableOutsideClose?: boolean;
  className?: string;
  isDisabledConfirmBtn?: boolean;
};

export function DeleteDialog({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete the item.',
  itemName,
  onConfirm,
  open,
  onOpenChange,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  id = 'delete-dialog',
  disableOutsideClose,
  className,
  isDisabledConfirmBtn = false
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('max-w-xl', className)}
        onInteractOutside={(e) => {
          if (disableOutsideClose) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (disableOutsideClose) e.preventDefault();
        }}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
      >
        <DialogHeader>
          <DialogTitle id={`${id}-title`}>{title}</DialogTitle>
          <DialogDescription id={`${id}-desc`}>{description}</DialogDescription>
        </DialogHeader>

        {itemName ? (
          <div className='mt-4'>
            <p className='text-muted-foreground text-sm'>
              Item: <strong>{itemName}</strong>
            </p>
          </div>
        ) : null}

        <DialogFooter>
          <div className='flex w-full items-center justify-end gap-2'>
            <Button variant='outline' onClick={() => onOpenChange?.(false)}>
              {cancelLabel}
            </Button>

            <Button
              variant='destructive'
              onClick={onConfirm}
              disabled={isDisabledConfirmBtn}
            >
              {confirmLabel}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

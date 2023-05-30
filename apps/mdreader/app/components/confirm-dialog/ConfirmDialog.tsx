import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@mdreader/interface';
import { ReactNode } from 'react';

type ConfirmDialogProps = {
  children?: ReactNode;
  description?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  open?: boolean;
  title?: string;
  trigger?: React.ReactNode;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  children,
  description,
  onCancel,
  onConfirm,
  open,
  title = 'Are you absolutely sure?',
  trigger,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          {onCancel && (
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          )}
          {onConfirm && (
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ConfirmDialog };

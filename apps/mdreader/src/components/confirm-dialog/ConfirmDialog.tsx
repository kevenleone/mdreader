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
} from '@mdreader/ui/components/ui/alert-dialog';

type ConfirmDialogProps = {
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  open?: boolean;
  title?: string;
  trigger?: React.ReactNode;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
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
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ConfirmDialog };

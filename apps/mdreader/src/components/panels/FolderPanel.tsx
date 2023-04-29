import { Button } from '@mdreader/ui/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@mdreader/ui/components/ui/sheet';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { folderSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '../form';
import { slugify } from '../../utils/slugify';
import { supabase } from '../../services/supabase';

type FolderForm = z.infer<typeof folderSchema>;

type FolderPanelFormProps = {
  onClose: () => void;
};

const FolderPanelForm: React.FC<FolderPanelFormProps> = ({ onClose }) => {
  const folderForm = useForm<FolderForm>({
    resolver: zodResolver(folderSchema),
  });

  const onCreateFolder = async (folder: FolderForm) => {
    const { error } = await supabase.from('Folders').insert([folder]);

    if (error) {
      return console.error(error);
    }

    onClose();
  };

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = folderForm;

  const slug = slugify(watch('name') ?? '');

  return (
    <Form
      formProviderProps={folderForm}
      onSubmit={handleSubmit(onCreateFolder)}
    >
      <Form.Field>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Input name="name" type="text" />
        <Form.ErrorMessage field="name" />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Input name="description" type="text" />
        <Form.ErrorMessage field="description" />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor="slug">Slug</Form.Label>
        <Form.Input name="slug" type="text" disabled value={slug} />
        <Form.ErrorMessage field="slug" />
      </Form.Field>

      <div className="flex justify-between gap-3">
        <Button disabled={isSubmitting} type="submit">
          Save
        </Button>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

const FolderPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Add
      </Button>

      {open && (
        <Sheet open onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Folder</SheetTitle>
              <SheetDescription>...</SheetDescription>
            </SheetHeader>

            <FolderPanelForm onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export { FolderPanel };

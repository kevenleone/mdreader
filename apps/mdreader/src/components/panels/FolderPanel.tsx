import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@mdreader/ui/components/ui/button';

import { folderSchema } from '../../schema';
import { slugify } from '../../utils/slugify';
import Form from '../form';
import { OnSaveArticleAndFolder } from '../../pages/profile/useFolderAndArticleActions';

type FolderForm = z.infer<typeof folderSchema>;

export type FolderPanelFormProps = {
  defaultValues: Partial<FolderForm>;
  onSave: OnSaveArticleAndFolder;
  onClose: () => void;
};

export const FolderPanelForm: React.FC<FolderPanelFormProps> = ({
  defaultValues,
  onSave,
  onClose,
}) => {
  const folderForm = useForm<FolderForm>({
    defaultValues,
    resolver: zodResolver(folderSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = folderForm;

  const slug = slugify(watch('name') ?? '');

  return (
    <Form
      formProviderProps={folderForm}
      onSubmit={handleSubmit(onSave('folder'))}
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

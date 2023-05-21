import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@mdreader/ui/components/ui/button';

import { Folder } from '../../services/folder';
import { folderSchema } from '../../schema';
import { OnSaveArticleAndFolder } from '../../pages/profile/useFolderAndArticleActions';
import { slugify } from '../../utils/slugify';
import Form from '../form';

type OutletContext = {
  folder?: Folder;
};

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
  const { folder } = useOutletContext<OutletContext>();

  const folderForm = useForm<FolderForm>({
    defaultValues: { ...defaultValues, folder_id: folder?.id },

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

      {folder && (
        <Form.Field>
          <Form.Label htmlFor="folder">Parent Folder</Form.Label>
          <Form.Input disabled name="folder" type="text" value={folder.name} />
        </Form.Field>
      )}

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

import { useForm } from 'react-hook-form';
import { useOutletContext } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '@mdreader/interface';
import { zodResolver } from '@hookform/resolvers/zod';

import { articleSchema } from '../../schema';
import { Folder } from '~/types';
import { OnSaveArticleAndFolder } from '~/hooks/useFolderAndArticleActions';
import { slugify } from '../../utils/slugify';
import Form from '../../components/form';

type OutletContext = {
  folder?: Folder;
};

type ArticleForm = z.infer<typeof articleSchema>;

export type ArticlePanelFormProps = {
  defaultValues: Partial<ArticleForm>;
  onClose: () => void;
  onSave: OnSaveArticleAndFolder;
};

export const ArticlePanelForm: React.FC<ArticlePanelFormProps> = ({
  defaultValues,
  onSave,
  onClose,
}) => {
  const { folder } = useOutletContext<OutletContext>();

  const articleForm = useForm<ArticleForm>({
    defaultValues: { ...defaultValues, folder_id: folder?.id },
    resolver: zodResolver(articleSchema),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = articleForm;

  const slug = slugify(watch('name') ?? '');

  return (
    <Form
      formProviderProps={articleForm}
      onSubmit={handleSubmit(onSave('article'))}
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

      <Form.Field>
        <Form.Label htmlFor="file_url">File URL</Form.Label>
        <Form.Input name="file_url" type="text" />
        <Form.ErrorMessage field="file_url" />
      </Form.Field>

      {folder && (
        <Form.Field>
          <Form.Label htmlFor="folder">Folder</Form.Label>
          <Form.Input disabled name="folder" type="text" value={folder.name} />
        </Form.Field>
      )}

      <div className="flex gap-2">
        <Form.Input name="featured" type="checkbox" useBaseInput />
        <Form.Label htmlFor="featured">Featured Article</Form.Label>
      </div>

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

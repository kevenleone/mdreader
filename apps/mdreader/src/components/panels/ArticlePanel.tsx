import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@mdreader/ui/components/ui/button';

import { articleSchema } from '../../schema';
import { slugify } from '../../utils/slugify';
import Form from '../../components/form';
import { OnSaveArticleAndFolder } from '../../pages/profile/useFolderAndArticleActions';

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
  const articleForm = useForm<ArticleForm>({
    defaultValues,
    resolver: zodResolver(articleSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
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
        <Form.Label htmlFor="fileUrl">File URL</Form.Label>
        <Form.Input name="fileUrl" type="text" />
        <Form.ErrorMessage field="fileUrl" />
      </Form.Field>

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

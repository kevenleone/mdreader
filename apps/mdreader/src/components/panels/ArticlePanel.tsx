import { KeyedMutator } from 'swr';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@mdreader/ui/components/ui/button';
import { useToast } from '@mdreader/ui/components/ui/use-toast';

import { articleSchema } from '../../schema';
import { articleService } from '../../services/article';
import { slugify } from '../../utils/slugify';
import Form from '../../components/form';

type ArticleForm = z.infer<typeof articleSchema>;

export type ArticlePanelFormProps = {
  mutateArticles: KeyedMutator<
    Awaited<ReturnType<typeof articleService.getAll>>
  >;
  onClose: () => void;
};

export const ArticlePanelForm: React.FC<ArticlePanelFormProps> = ({
  mutateArticles,
  onClose,
}) => {
  const { toast } = useToast();

  const articleForm = useForm<ArticleForm>({
    resolver: zodResolver(articleSchema),
  });

  const onCreateArticle = async (article: ArticleForm) => {
    const { error } = await articleService.store(article);

    if (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });

      return console.error(error);
    }

    mutateArticles((prevArticles) => [
      ...(prevArticles as any),
      { ...article, id: new Date().getTime() },
    ]);

    toast({
      title: 'Oh Yeah!',
      description: 'An Article was added to your list :)',
    });

    onClose();
  };

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = articleForm;

  const slug = slugify(watch('name') ?? '');

  return (
    <Form
      formProviderProps={articleForm}
      onSubmit={handleSubmit(onCreateArticle)}
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

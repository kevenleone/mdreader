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
import { articleSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '../../components/form';
import { slugify } from '../../utils/slugify';
import { supabase } from '../../services/supabase';

type ArticleForm = z.infer<typeof articleSchema>;

type ArticlePanelFormProps = {
  onClose: () => void;
};

const ArticlePanelForm: React.FC<ArticlePanelFormProps> = ({ onClose }) => {
  const articleForm = useForm<ArticleForm>({
    resolver: zodResolver(articleSchema),
  });

  const onCreateArticle = async (article: ArticleForm) => {
    const { error } = await supabase.from('Articles').insert([article]);

    if (error) {
      return console.error(error);
    }

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

const ArticlePanel = () => {
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
              <SheetTitle>Add Article</SheetTitle>
              <SheetDescription>...</SheetDescription>
            </SheetHeader>

            <ArticlePanelForm onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export { ArticlePanel };

import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@mdreader/interface';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWR, { KeyedMutator } from 'swr';

import Form from '../../components/form';
import { knowledgeSchema } from '../../schema';
import { slugify } from '../../utils/slugify';
import { useDebounce } from '~/hooks/useDebounce';
import { KnowledgeGroup, URLMetadata } from '~/types';
import MetadataPreview from '../metadata-preview';
import { useKnowledgeBaseService } from '~/hooks/useKnowledgeBase';
import { encodeImageToBlurhash } from '~/utils/blurhash';

type KnowledgeForm = z.infer<typeof knowledgeSchema>;

export type KnowledgePanelFormProps = {
  defaultValues: Partial<KnowledgeForm>;
  onClose: () => void;
  onSave: (data: KnowledgeForm & { metadata?: URLMetadata }) => void;
};

export const KnowledgePanelForm: React.FC<KnowledgePanelFormProps> = ({
  defaultValues,
  onClose,
  onSave,
}) => {
  const knowledgeForm = useForm<KnowledgeForm>({
    defaultValues,
    mode: 'all',
    resolver: zodResolver(knowledgeSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = knowledgeForm;

  const slug = slugify(watch('description') ?? '');
  const url = watch('url');

  const debouncedValue = useDebounce(url, 1000);

  const { data: metadata } = useSWR<URLMetadata>(
    errors?.url || !debouncedValue ? null : `/metadata/${debouncedValue}`,
    async () => {
      const response = await fetch(`/api/metadata?url=${debouncedValue}`);

      return response.json();
    }
  );

  return (
    <Form
      formProviderProps={knowledgeForm}
      onSubmit={handleSubmit((data) => onSave({ ...data, metadata }))}
    >
      <Form.Field>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Input name="description" type="text" />
        <Form.ErrorMessage field="description" />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor="url">URL</Form.Label>
        <Form.Input name="url" type="text" />
        <Form.ErrorMessage field="url" />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor="slug">Slug</Form.Label>
        <Form.Input name="slug" type="text" disabled value={slug} />
        <Form.ErrorMessage field="slug" />
      </Form.Field>

      {metadata && <MetadataPreview {...metadata} />}

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

type KnowledgePanelProps = {
  knowledgeGroup: KnowledgeGroup;
  mutateKnowledgeGroup: KeyedMutator<KnowledgeGroup[]>;
};

const KnowledgePanel: React.FC<KnowledgePanelProps> = ({
  mutateKnowledgeGroup,
  knowledgeGroup,
}) => {
  const [open, setOpen] = useState(false);
  const knowledgeBaseService = useKnowledgeBaseService();

  const onClose = () => setOpen(false);

  const onSave = async (data: KnowledgeForm & { metadata?: URLMetadata }) => {
    const metadata = data.metadata;
    const image = metadata?.image || metadata?.['og:image'];
    let blurhash;

    if (image) {
      const { blurhash: encodedBlurHash, error } = await encodeImageToBlurhash(
        image
      );

      if (encodedBlurHash) {
        blurhash = encodedBlurHash;
      }

      if (error) {
        console.error('Blurhash error: ', error);
      }
    }

    delete data.metadata;

    const response = await knowledgeBaseService.upsert({
      ...data,
      blurhash,
      image,
      knowledge_group_id: knowledgeGroup.id,
    });

    mutateKnowledgeGroup((prevKnowledgeGroups) => [
      ...(prevKnowledgeGroups as any),
      response.data[0],
    ]);

    onClose();
  };

  return (
    <>
      <Button variant="default" onClick={() => setOpen(true)}>
        Add Knowledge
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="capitalize">Knowledge Base</SheetTitle>
          </SheetHeader>

          <KnowledgePanelForm
            defaultValues={{}}
            onClose={onClose}
            onSave={onSave}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default KnowledgePanel;

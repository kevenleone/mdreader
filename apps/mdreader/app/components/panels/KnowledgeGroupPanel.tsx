import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@mdreader/interface';
import { KeyedMutator } from 'swr';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import BoringAvatar from 'boring-avatars';

import Form from '../form';
import { knowledgeGroupSchema } from '../../schema';
import { slugify } from '../../utils/slugify';
import { KnowledgeGroup } from '~/types';
import { useKnowledgeGroupService } from '~/hooks/useKnowledgeGroup';

type KnowledgeGroupForm = z.infer<typeof knowledgeGroupSchema>;

export type KnowledgeGroupPanelFormProps = {
  defaultValues: Partial<KnowledgeGroupForm>;
  onClose: () => void;
  onSave: (data: KnowledgeGroupForm) => void;
};

export const KnowledgeGroupPanelForm: React.FC<
  KnowledgeGroupPanelFormProps
> = ({ defaultValues, onClose, onSave }) => {
  const knowledgeForm = useForm<KnowledgeGroupForm>({
    defaultValues,
    resolver: zodResolver(knowledgeGroupSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = knowledgeForm;

  const name = watch('name') ?? '';
  const slug = slugify(name);

  return (
    <Form
      formProviderProps={knowledgeForm}
      onSubmit={handleSubmit((data) => onSave(data))}
    >
      <div className="flex justify-center" title="Avatar Preview">
        <BoringAvatar name={name} variant="bauhaus" />
      </div>

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

type KnowledgeGroupPanelProps = {
  knowledgeGroup?: KnowledgeGroup;
  mutateKnowledgeGroupGroup: KeyedMutator<
    PostgrestSingleResponse<KnowledgeGroup>
  >;
};

const KnowledgeGroupPanel: React.FC<KnowledgeGroupPanelProps> = ({
  mutateKnowledgeGroupGroup,
  knowledgeGroup,
}) => {
  const [open, setOpen] = useState(false);
  const knowledgeGroupService = useKnowledgeGroupService();

  const onClose = () => setOpen(false);

  const onSave = async (data: KnowledgeGroupForm) => {
    const response = await knowledgeGroupService.upsert(data);

    mutateKnowledgeGroupGroup((prevKnowledgeGroupGroups) => ({
      ...(prevKnowledgeGroupGroups as any),
      data: [...(prevKnowledgeGroupGroups as any)?.data, response.data[0]],
    }));

    onClose();
  };

  return (
    <>
      <Button variant="default" onClick={() => setOpen(true)}>
        New
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="capitalize">Knowledge Group</SheetTitle>
          </SheetHeader>

          <KnowledgeGroupPanelForm
            defaultValues={knowledgeGroup as KnowledgeGroup}
            onClose={onClose}
            onSave={onSave}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default KnowledgeGroupPanel;

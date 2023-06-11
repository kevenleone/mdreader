import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Switch } from '@mdreader/interface';
import { useOutletContext } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ConfirmDialog } from '~/components/confirm-dialog/ConfirmDialog';

import Form from '~/components/form';
import { useKnowledgeGroupService } from '~/hooks/useKnowledgeGroup';
import { knowledgeGroupSchema } from '~/schema';

import { KnowledgeGroup } from '~/types';

type KnowledgeGroupForm = z.infer<typeof knowledgeGroupSchema>;

const KnowledgeGroupSettings = () => {
  const { knowledgeGroup } = useOutletContext<{
    knowledgeGroup: KnowledgeGroup;
  }>();

  const knowledgeGroupService = useKnowledgeGroupService();

  const form = useForm({
    defaultValues: knowledgeGroup,
    resolver: zodResolver(knowledgeGroupSchema),
  });

  const deleteKnowledgeGroup = async () => {
    await knowledgeGroupService.remove(knowledgeGroup.id);
  };

  const onSubmit = async (data: KnowledgeGroupForm) => {
    await knowledgeGroupService.upsert(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">Update Group Settings...</p>

      <Form formProviderProps={form} onSubmit={form.handleSubmit(onSubmit)}>
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

        <Form.Field className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div>
            <Form.Label htmlFor="url">Project Visibility (Private)</Form.Label>
            <Form.HelpMessage>
              Select according to the visibility of the project, private
              projects can be accessed only by participants and invited users.
            </Form.HelpMessage>
          </div>
          <Form.Switch name="private" />
        </Form.Field>

        <div className="flex flex-col w-100 ">
          <ConfirmDialog
            onConfirm={deleteKnowledgeGroup}
            title="Are you sure you want to delete this knowledge group?"
            description="All the Knowledge Base will be deleted and this action cannot be undone."
            trigger={
              <Button variant="destructive" onClick={() => null} type="button">
                Delete Knowledge Base
              </Button>
            }
          />
        </div>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default KnowledgeGroupSettings;

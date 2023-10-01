import { zodResolver } from '@hookform/resolvers/zod';
import { Button, useToast } from '@mdreader/interface';
import { useNavigate, useOutletContext } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ConfirmDialog } from '~/components/confirm-dialog/ConfirmDialog';

import Form from '~/components/form';
import { useKnowledgeGroupService } from '~/hooks/useKnowledgeGroup';
import useSession from '~/hooks/useSession';
import { knowledgeGroupSchema } from '~/schema';

import { KnowledgeGroup } from '~/types';
import { slugify } from '~/utils/slugify';

type KnowledgeGroupForm = z.infer<typeof knowledgeGroupSchema>;

const KnowledgeGroupSettings = () => {
  const { knowledgeGroup } = useOutletContext<{
    knowledgeGroup: KnowledgeGroup;
  }>();

  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();

  const knowledgeGroupService = useKnowledgeGroupService();

  const form = useForm({
    defaultValues: knowledgeGroup,
    resolver: zodResolver(knowledgeGroupSchema),
  });

  const slug = slugify(form.watch('name') ?? '');

  if (session?.user.id !== knowledgeGroup.owner.id) {
    return <h1>Now allowed.</h1>;
  }

  const deleteKnowledgeGroup = async () => {
    const response = await knowledgeGroupService.remove(knowledgeGroup.id);

    if (response.data.length) {
      navigate('/knowledge-groups');
    }
  };

  const onSubmit = async (data: KnowledgeGroupForm) => {
    const response = await knowledgeGroupService.upsert(data);

    if (!response.data.length) {
      return toast({
        description: `Unable to update group.`,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }

    toast({
      description: 'Updated with success.',
      title: 'Success.',
    });

    if (data.slug !== knowledgeGroup.slug) {
      navigate(`./../../${data.slug}/settings`);
    }
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
          <Form.Label htmlFor="slug">Slug</Form.Label>
          <Form.Input name="slug" type="text" disabled value={slug} />
          <Form.ErrorMessage field="slug" />
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
              <Button variant="destructive" type="button">
                Delete Knowledge Group
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

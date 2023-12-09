import { useOutletContext } from '@remix-run/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  useToast,
} from '@mdreader/interface';

import { KnowledgeGroup, KnowledgeGroupUser } from '~/types';
import { getInitials } from '~/utils';
import { useState } from 'react';
import { useProfileService } from '~/hooks/useProfiles';
import { useKnowledgeGroupUser } from '~/hooks/useKnowledgeGroupUser';
import { ConfirmDialog } from '~/components/confirm-dialog/ConfirmDialog';

type KnowledgeGroupMemberProps = {
  knowledgeGroupUser: KnowledgeGroupUser;
};

const KnowledgeGroupMember: React.FC<KnowledgeGroupMemberProps> = ({
  knowledgeGroupUser,
}) => {
  const knowledgeGroupUserService = useKnowledgeGroupUser();
  const { toast } = useToast();

  const onRemoveMember = async () => {
    const { data } = await knowledgeGroupUserService.remove(
      knowledgeGroupUser.id
    );

    if (data.length > 0) {
      return toast({
        description: 'User deleted with success.',
        title: 'Success.',
        variant: 'default',
      });
    }

    toast({
      description: `Unable to delete ${knowledgeGroupUser.profile.name}.`,
      title: 'Uh oh! Something went wrong.',
      variant: 'destructive',
    });
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={knowledgeGroupUser.profile.photo} />
          <AvatarFallback>
            {getInitials(knowledgeGroupUser.profile.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {knowledgeGroupUser.profile.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {knowledgeGroupUser.profile.login}
          </p>
        </div>
      </div>
      {knowledgeGroupUser.role === 'owner' ? (
        <div className="flex font-bold justify-center ml-auto w-[110px]">
          Owner
        </div>
      ) : (
        <Select defaultValue="edit">
          <SelectTrigger className="ml-auto w-[110px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="edit">Can edit</SelectItem>
            <SelectItem value="view">Can view</SelectItem>
            <ConfirmDialog
              description={`${knowledgeGroupUser.profile.name} will not be able to view / contribute with this group until be readded.`}
              onConfirm={onRemoveMember}
              trigger={
                <div className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  Remove
                </div>
              }
            ></ConfirmDialog>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

const KnowledgeGroupMembers = () => {
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  const profileService = useProfileService();
  const knowledgeGroupUserService = useKnowledgeGroupUser();

  const { knowledgeGroup } = useOutletContext<{
    knowledgeGroup: KnowledgeGroup;
  }>();

  const inviteUser = async () => {
    if (!username.trim()) {
      return toast({
        description: 'Username is missing.',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }

    if (knowledgeGroup.owner.login === username) {
      return toast({
        description: 'You cannot invite yourself.',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }

    if (
      knowledgeGroup.knowledge_group_users.some(
        ({ profile: { login } }) => login === username
      )
    ) {
      return toast({
        description: 'User already invited.',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }

    const profile = await profileService.getOne({
      filters: [{ operator: 'eq', property: 'login', value: username }],
    });

    if (!profile) {
      return toast({
        description: 'User not found.',
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }

    const { data } = await knowledgeGroupUserService.upsert({
      knowledge_group_id: knowledgeGroup.id,
      role: 'user',
      user_id: profile.id,
    });

    if (!data.length) {
      return toast({
        description: `Unable to invite ${profile.name}r.`,
        title: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    }

    return toast({
      description: `${profile.name} invited with success.`,
      title: 'Success.',
    });
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
        <p className="text-muted-foreground">
          Invite your team members to collaborate
        </p>
      </div>

      <div className="flex space-x-4 my-2">
        <Input
          value={username}
          onChange={(event: any) => setUsername(event.target.value)}
          placeholder="MD Reader Username"
        />
        <Button
          className="shrink-0"
          disabled={!username?.trim().length}
          onClick={inviteUser}
          variant="default"
        >
          Invite
        </Button>
      </div>

      <div className="flex space-x-4 my-2">
        <Input value={`${window.location.href}?invite-code=XYZ`} readOnly />
        <Button variant="secondary" className="shrink-0">
          Copy Link
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">People with access</h4>
        <div className="grid gap-6">
          {knowledgeGroup?.owner && (
            <KnowledgeGroupMember
              knowledgeGroupUser={{
                created_at: '',
                id: 0,
                knowledge_group_id: 0,
                profile: knowledgeGroup.owner,
                role: 'owner',
                user_id: knowledgeGroup.owner.id,
              }}
            />
          )}

          {knowledgeGroup?.knowledge_group_users?.map(
            (knowledgeGroupUser, index) => (
              <KnowledgeGroupMember
                key={index}
                knowledgeGroupUser={knowledgeGroupUser}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default KnowledgeGroupMembers;

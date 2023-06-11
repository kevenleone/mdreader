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
} from '@mdreader/interface';

import { KnowledgeGroup } from '~/types';
import { getInitials } from '~/utils';

const KnowledgeGroupMembers = () => {
  const { knowledgeGroup } = useOutletContext<{
    knowledgeGroup: KnowledgeGroup;
  }>();

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
        <p className="text-muted-foreground">
          Invite your team members to collaborate
        </p>
      </div>

      <div className="flex space-x-4 my-2">
        <Input value="http://example.com/link/to/document" readOnly />
        <Button variant="secondary" className="shrink-0">
          Copy Link
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">People with access</h4>
        <div className="grid gap-6">
          {knowledgeGroup?.knowledge_group_users?.map(
            (knowledgeGroupUser, index) => (
              <div
                className="flex items-center justify-between space-x-4"
                key={index}
              >
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
                <Select defaultValue="edit">
                  <SelectTrigger className="ml-auto w-[110px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Can edit</SelectItem>
                    <SelectItem value="view">Can view</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default KnowledgeGroupMembers;

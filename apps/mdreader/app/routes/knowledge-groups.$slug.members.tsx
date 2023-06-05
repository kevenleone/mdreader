import { useOutletContext } from '@remix-run/react';
import { Avatar, AvatarImage, AvatarFallback } from '@mdreader/interface';

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

      {knowledgeGroup?.KnowledgeGroupUsers?.map((knowledgeGroupUser, index) => (
        <div
          className="flex items-center justify-between space-x-4 my-4"
          key={index}
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={knowledgeGroupUser.Profiles.photo} />
              <AvatarFallback>
                {getInitials(knowledgeGroupUser.Profiles.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {knowledgeGroupUser.Profiles.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {knowledgeGroupUser.Profiles.login}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default KnowledgeGroupMembers;

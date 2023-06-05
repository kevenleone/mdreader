import { useOutletContext } from '@remix-run/react';

import { KnowledgeGroup } from '~/types';

const KnowledgeGroupSettings = () => {
  const { knowledgeGroup } = useOutletContext<{
    knowledgeGroup: KnowledgeGroup;
  }>();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">Update Group Settings...</p>
    </div>
  );
};

export default KnowledgeGroupSettings;

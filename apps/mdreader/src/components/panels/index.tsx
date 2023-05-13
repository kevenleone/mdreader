import { Button } from '@mdreader/ui/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@mdreader/ui/components/ui/sheet';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@mdreader/ui/components/ui/tabs';

import { ArticlePanelForm, ArticlePanelFormProps } from './ArticlePanel';
import { FolderPanelForm, FolderPanelFormProps } from './FolderPanel';
import React, { ReactNode } from 'react';
import { OnSaveArticleAndFolder } from '../../pages/profile/useFolderAndArticleActions';

type PanelProps = {
  defaultPanel?: 'article' | 'folder';
  defaultValues:
    | ArticlePanelFormProps['defaultValues']
    | FolderPanelFormProps['defaultValues'];
  onSave: OnSaveArticleAndFolder;
  open?: boolean;
  setOpen: React.Dispatch<boolean>;
};

type PanelContentProps = {
  children: ReactNode;
  title: string;
};

const PanelContent: React.FC<PanelContentProps> = ({ children, title }) => {
  return (
    <>
      <SheetHeader>
        <SheetTitle className="capitalize">{title}</SheetTitle>
      </SheetHeader>

      {children}
    </>
  );
};

const Panel: React.FC<PanelProps> = ({
  defaultPanel,
  defaultValues,
  onSave,
  open,
  setOpen,
}) => {
  const DynamicPanelComponent =
    defaultPanel === 'article' ? ArticlePanelForm : FolderPanelForm;

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Add Content
      </Button>

      {open && (
        <Sheet open onOpenChange={setOpen}>
          <SheetContent>
            {defaultPanel ? (
              <PanelContent title={`Update ${defaultPanel}`}>
                <DynamicPanelComponent
                  defaultValues={defaultValues as PanelProps['defaultValues']}
                  onClose={() => setOpen(false)}
                  onSave={onSave}
                />
              </PanelContent>
            ) : (
              <Tabs defaultValue={defaultPanel ?? 'article'}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="article">Article</TabsTrigger>
                  <TabsTrigger value="folder">Folder</TabsTrigger>
                </TabsList>

                <TabsContent value="article">
                  <PanelContent title="Add Article">
                    <ArticlePanelForm
                      defaultValues={
                        defaultPanel === 'article' ? defaultValues : {}
                      }
                      onClose={() => setOpen(false)}
                      onSave={onSave}
                    />
                  </PanelContent>
                </TabsContent>

                <TabsContent value="folder">
                  <PanelContent title="Add Folder">
                    <FolderPanelForm
                      defaultValues={
                        defaultPanel === 'folder' ? defaultValues : {}
                      }
                      onClose={() => setOpen(false)}
                      onSave={onSave}
                    />
                  </PanelContent>
                </TabsContent>
              </Tabs>
            )}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export { Panel };

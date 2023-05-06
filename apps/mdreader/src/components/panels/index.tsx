import { Button } from "@mdreader/ui/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@mdreader/ui/components/ui/sheet";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mdreader/ui/components/ui/tabs";

import { useState } from "react";
import { ArticlePanelForm, ArticlePanelFormProps } from "./ArticlePanel";
import { FolderPanelForm, FolderPanelFormProps } from "./FolderPanel";

type PanelProps = {} & Pick<ArticlePanelFormProps, "mutateArticles"> &
  Pick<FolderPanelFormProps, "mutateFolders">;

const Panel: React.FC<PanelProps> = ({ mutateArticles, mutateFolders }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Add Content
      </Button>

      {open && (
        <Sheet open onOpenChange={setOpen}>
          <SheetContent>
            <Tabs defaultValue="article">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="article">Article</TabsTrigger>
                <TabsTrigger value="folder">Folder</TabsTrigger>
              </TabsList>
              <TabsContent value="article">
                <SheetHeader>
                  <SheetTitle>Add Article</SheetTitle>
                </SheetHeader>

                <ArticlePanelForm
                  mutateArticles={mutateArticles}
                  onClose={() => setOpen(false)}
                />
              </TabsContent>

              <TabsContent value="folder">
                <SheetHeader>
                  <SheetTitle>Add Folder</SheetTitle>
                </SheetHeader>

                <FolderPanelForm
                  mutateFolders={mutateFolders}
                  onClose={() => setOpen(false)}
                />
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export { Panel };

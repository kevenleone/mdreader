import { z } from "zod";
import { folderSchema } from "../schema";
import { supabase } from "./supabase";

type Folder = {
  id: number;
  name: string;
  slug: string;
  fileUrl: string;
};

const folderService = {
  getAll: async ({
    folderId,
    userId,
  }: {
    folderId: number | string;
    userId: string;
  }) => {
    const { data, error } = await supabase
      .from("Folders")
      .select("*")
      .filter("folder_id", folderId ? "eq" : "is", folderId)
      .filter("user_id", "eq", userId)
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as Folder[];
  },
  store: (folder: z.infer<typeof folderSchema>) =>
    supabase.from("Folders").insert(folder),
  remove: (id: number) => supabase.from("Folders").delete().eq("id", id),
};

export { folderService };

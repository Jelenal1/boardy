"use server";
import { revalidatePath } from "next/cache";

// revalidate a specific path
export async function revalidatePage(path: string) {
  revalidatePath(path, "page");
}

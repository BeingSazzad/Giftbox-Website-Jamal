"use server";

import { revalidatePath } from "next/cache";


export const revalidateTags = async (tags: string[]) => {
    tags.forEach((tag) => {
        revalidatePath(tag);
    });
};
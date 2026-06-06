"use server";

import { myFetch } from "@/lib/myFetch";

export async function submitSupportAction(formData: FormData) {
  const res = await myFetch("/supports", {
    method: "POST",
    body: formData,
  });
  return res;
}

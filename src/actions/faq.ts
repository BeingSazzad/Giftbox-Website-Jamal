"use server";

import { myFetch } from "@/lib/myFetch";

export async function getFaqsAction() {
  const res = await myFetch("/faqs", {
    method: "GET",
  });
  return res;
}

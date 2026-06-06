"use server";

import { myFetch } from "@/lib/myFetch";

export async function getSettingsAction() {
  const res = await myFetch("/settings", {
    method: "GET",
  });
  return res;
}

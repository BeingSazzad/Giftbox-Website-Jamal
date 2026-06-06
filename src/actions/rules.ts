"use server";

import { myFetch } from "@/lib/myFetch";

export async function getTermsAction() {
  const res = await myFetch("/rules/terms", { method: "GET" });
  return res;
}

export async function getPrivacyAction() {
  const res = await myFetch("/rules/privacy", { method: "GET" });
  return res;
}

export async function getAboutAction() {
  const res = await myFetch("/rules/about", { method: "GET" });
  return res;
}

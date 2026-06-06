"use server";

import { myFetch } from "@/lib/myFetch";

export async function getActiveLotteriesAction() {
  const res = await myFetch("/lottery/active", {
    method: "GET",
  });
  return res;
}

export async function getActiveLotteryByIdAction(id: string) {
  const res = await myFetch(`/lottery/active/${id}`, {
    method: "GET",
  });
  return res;
}

export async function participateLotteryAction(formData: FormData) {
  const res = await myFetch("/participants", {
    method: "POST",
    body: formData,
  });

  return res;
}

export async function getMyParticipationsAction() {
  const res = await myFetch("/participants/my-participated", {
    method: "GET",
  });
  return res;
}

export async function getParticipationByIdAction(id: string) {
  const res = await myFetch(`/participants/my-participations/${id}`, {
    method: "GET",
  });
  return res;
}

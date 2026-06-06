"use server";

import { myFetch } from "@/lib/myFetch";

export async function getNotificationsAction(page = 1, limit = 10) {
  return await myFetch(`/notifications?page=${page}&limit=${limit}`, {
    method: "GET",
  });
}

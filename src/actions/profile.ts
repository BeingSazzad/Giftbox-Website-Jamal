"use server";

import { myFetch } from "@/lib/myFetch"; 

import getProfile from "@/lib/getProfile";

export async function getProfileAction() {
  return await getProfile();
}

export async function updateProfileAction(formData: FormData) {
  return await myFetch("/users", {
    method: "PATCH",
    body: formData,
  });
} 

export async function changePasswordAction(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  return await myFetch("/auth/change-password", {
    method: "POST",
    body: payload,
  });
} 


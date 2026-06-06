"use server";

import { myFetch } from "@/lib/myFetch";
import getProfile from "@/lib/getProfile";
import { cookies } from "next/headers";

export async function registerAction(payload: any) {
  const res = await myFetch("/users", {
    method: "POST",
    body: payload,
  });

  const token = res.data?.token || res.data?.accessToken;
  if (res.success && token) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", token, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  return res;
}
export async function loginAction(payload: { identifier: string; password: string }) {
  const res = await myFetch("/auth/login", {
    method: "POST",
    body: payload,
  });

  const token = res.data?.token || res.data?.accessToken;
  if (res.success && token) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", token, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  return res;
}

export async function forgetPasswordAction(payload: { identifier: string }) {
  const res = await myFetch("/auth/forget-password", {
    method: "POST",
    body: payload,
  });

  return res;
}

export async function verifyAccountAction(payload: { identifier: string; code: string }) {
  const res = await myFetch("/auth/verify-account", {
    method: "POST",
    body: payload,
  });
  return res;
}

export async function resendOtpAction(payload: { identifier: string }) {
  const res = await myFetch("/auth/resend-otp", {
    method: "POST",
    body: payload,
  });

  return res;
}

export async function resetPasswordAction(payload: { newPassword: string; confirmPassword: string; resetToken: string }) {
  const { resetToken, ...body } = payload;
  const res = await myFetch("/auth/reset-password", {
    method: "POST",
    body,
    headers: {
      "X-Reset-Token": resetToken,
    },
  });

  return res;
}

export async function getProfileAction() {
  const profile = await getProfile();
  return profile;
}

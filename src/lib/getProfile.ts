"use server";

import { cookies } from "next/headers";

const getProfile = async (): Promise<any | null> => {
  const token = (await cookies()).get("accessToken")?.value; 
  console.log('Access token in getProfile:', token);

  if (!token) return null;
  const res = await fetch(`${process.env.BASE_URL}api/v1/users/profile`, {
    next: {
      tags: ["user-profile"],
    },
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { data } = await res?.json();
  console.log('User profile data in getProfile:', data);

  return data;
};

export default getProfile;
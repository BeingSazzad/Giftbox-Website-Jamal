"use client";

import { getProfileAction } from "@/actions/profile";
import { useEffect, useState } from "react";


export function useProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getProfileAction()
      .then((res) => setUser(res))
      .catch(console.error);
  }, []);

  return user;
}
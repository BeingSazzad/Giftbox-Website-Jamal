/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccessToken } from "./getAccessToken";

export interface FetchResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: any;
  error?: string | null;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  tags?: string[];
  token?: string;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

export const myFetch = async <T = any>(
  url: string,
  {
    method = "GET",
    body,
    tags,
    token,
    headers = {},
    cache = "no-store",
  }: FetchOptions = {}
): Promise<FetchResponse<T>> => {
  const accessToken = await getAccessToken();
  const isFormData = body instanceof FormData;
   const hasBody = body !== undefined && method !== "GET";

  const reqHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(token ? { Authorization: `${token}` } : {}),
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1${url}`, {
      method,
      headers: reqHeaders,
      ...(hasBody && { body: isFormData ? body : JSON.stringify(body) }),
      ...(tags && { next: { tags } }),
      ...(!(method === "GET") ? { cache: "no-store" } : { cache: cache }),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json?.message,
        error: json?.errorMessages || "Request failed",
      };
    }

    return {
      success: true,
      message: json?.message,
      data: json?.data,
      meta: json?.meta,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network error",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};
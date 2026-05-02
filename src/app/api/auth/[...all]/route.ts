import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "@/lib/auth";

export const GET = async (request: Request) => {
  const { GET } = toNextJsHandler(getAuth().handler);

  return GET(request);
};

export const POST = async (request: Request) => {
  const { POST } = toNextJsHandler(getAuth().handler);

  return POST(request);
};

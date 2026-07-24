import { handlers } from "@/auth";
import { enforceRateLimit, requestIpHash } from "@/lib/security";

async function limited(request: Request, handler: (request: Request) => Promise<Response>) {
  const ipHash = await requestIpHash();
  await enforceRateLimit({
    key: ipHash,
    action: "auth",
    limit: 30,
    windowSeconds: 60
  });
  return handler(request);
}

export const GET = (request: Request) => limited(request, handlers.GET);
export const POST = (request: Request) => limited(request, handlers.POST);

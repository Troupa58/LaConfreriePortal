CREATE TABLE "RateLimitEvent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RateLimitEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SecurityLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "actorId" TEXT,
    "ipHash" TEXT,
    "targetId" TEXT,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SecurityLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "RateLimitEvent_key_action_createdAt_idx"
ON "RateLimitEvent"("key", "action", "createdAt");
CREATE INDEX "SecurityLog_action_createdAt_idx"
ON "SecurityLog"("action", "createdAt");
CREATE INDEX "SecurityLog_actorId_createdAt_idx"
ON "SecurityLog"("actorId", "createdAt");

export * from "./publishers"
export * as processors from "./processors"
export * as analytics from "./analytics"
export * as identification from "./identification"
export * as backfillCache from "./backfill"

import { processors } from "./processors"

export const shutdown = () => {
  processors.shutdown()
}

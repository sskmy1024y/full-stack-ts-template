import type { AppContext } from "../context/appContext.js";

export const withUsecaseTraceLog = async <T>(
  _ctx: AppContext,
  usecaseName: string,
  metadata: Record<string, unknown>,
  fn: () => Promise<T>
): Promise<T> => {
  const startTime = Date.now();
  
  try {
    console.log(`[${usecaseName}] Starting with:`, metadata);
    const result = await fn();
    const duration = Date.now() - startTime;
    console.log(`[${usecaseName}] Completed in ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${usecaseName}] Failed after ${duration}ms:`, error);
    throw error;
  }
};

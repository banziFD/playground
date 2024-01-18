import { login } from "./login";
import { createBatchRun } from "./batch-run";

export const publicMain = async (): Promise<any> => {
  const loginRes = await login();
  const batchRun = createBatchRun(loginRes.access_token);
  return batchRun;
};

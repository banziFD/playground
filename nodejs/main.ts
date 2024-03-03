import { promiseAllSettledMain } from "./src/language-feature/promise-allsettled";

const main = async (): Promise<void> => {
  console.log("start");
  const start = new Date().getTime();
  const res = await promiseAllSettledMain();
  console.log((new Date().getTime() - start) / 1000);
};

main();

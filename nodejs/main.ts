import { publicMain } from "./src/public-api/public-api";

const main = async (): Promise<void> => {
  console.log("start");
  const start = new Date().getTime();
  const res = await publicMain();
  console.log(JSON.stringify(res.data));
  console.log((new Date().getTime() - start) / 1000);
};

main();

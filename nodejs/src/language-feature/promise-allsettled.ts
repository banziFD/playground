export class CustomError extends Error {
  foo = "helloworld";
  constructor(err: string) {
    super(err);
  }
}

const foo = async (n: number): Promise<number> => {
  console.log(`foo: ${n}`);
  if (n === 3) {
    throw Error("fuc you");
  }

  if (n % 2 !== 0) {
    const err = new CustomError("odd number");
    console.error(err);
    console.error(JSON.stringify(err));
    throw err;
  }
  return n;
};

export const promiseAllSettledMain = async (): Promise<void> => {
  const nums = [0, 1, 2, 3, 4];

  try {
    const results = await Promise.allSettled(nums.map((n) => foo(n)));
    results.forEach((v) => {
      console.log(v.status);
      if (v.status === "rejected") {
        console.log("lol");
        console.log(typeof v.reason);
        console.log(v.reason instanceof CustomError);
        console.log("\n\n\n");
      } else {
        console.log(v.value);
        console.log("\n\n\n");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

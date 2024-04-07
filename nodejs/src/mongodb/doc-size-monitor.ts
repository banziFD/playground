import { Db, MongoClient, ObjectId } from "mongodb";
import * as fs from "fs";

const PIPELINE = [
  {
    $project: {
      _id: 1,
      bsonSize: {
        $bsonSize: "$$ROOT",
      },
    },
  },
  {
    $sort: {
      bsonSize: -1,
    },
  },
];

export interface IColSummary {
  colName: string;
  length: number;
  top10Objects?: any[];
  bsonSizes: {
    _id: ObjectId;
    bsonSize: number;
  }[];
}

const gatherInformation = async (db: Db): Promise<IColSummary[]> => {
  const res: IColSummary[] = [];

  const colNames = (await db.listCollections().toArray()).map((i) => i.name);
  console.log(colNames);
  for (const colName of colNames) {
    console.log(`gathering information for ${colName}`);
    const col = db.collection(colName);
    const docWithSizeArray = await col
      .aggregate<{ _id: ObjectId; bsonSize: number }>(PIPELINE)
      .toArray();
    if (docWithSizeArray.length === 0) {
      console.log(`${colName} does not have any docs \n\n\n`);
      continue;
    }

    const top10ObjectIds = docWithSizeArray.slice(0, 10).map((i) => i._id);
    const top10Objects = await col
      .find({ _id: { $in: top10ObjectIds } })
      .toArray();

    const summary: IColSummary = {
      colName,
      // comment top10Objects if it's get huge
      // top10Objects,
      length: docWithSizeArray.length,
      bsonSizes: docWithSizeArray,
    };
    res.push(summary);
    console.log(`finish summary ${colName} \n\n\n`);
  }

  return res;
};

export const main = async (): Promise<void> => {
  const connectionStr = "mongodb://localhost:27017";
  const dbName = "apprentice_api_tests";

  const client = new MongoClient(connectionStr);

  try {
    const db = client.db(dbName);
    const summary = await gatherInformation(db);
    fs.writeFile("./summary.json", JSON.stringify(summary), (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

main();

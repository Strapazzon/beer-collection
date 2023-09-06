import { kv } from "@vercel/kv";
import { uuid } from "uuidv4";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  collectionId: string;
};

interface Request extends NextApiRequest {
  body: {};
}

const controller = async (req: Request, res: NextApiResponse<Data>) => {
  const { method } = req;

  const allowedMethods = ["POST"];

  if (!method || !allowedMethods.includes(method)) {
    res.status(405);
    return;
  }

  const collectionId = `${process.env.REDIS_COLLECTION_PREFIX}${uuid()}`;

  await kv.lpush(collectionId, "0");

  res.status(200).json({ collectionId });
};

export default controller;

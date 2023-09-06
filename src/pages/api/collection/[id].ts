import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ids?: number[];
  status?: string;
};

interface Request extends NextApiRequest {
  body: {
    beerId: number;
  };
}

const controller = async (req: Request, res: NextApiResponse<Data>) => {
  const { method, body, query } = req;
  const { beerId } = body;
  const collectionId = query?.id as string;

  const allowedMethods = ["POST", "DELETE", "GET"];

  if (!method || !allowedMethods.includes(method) || !collectionId) {
    res.status(405).json({ status: "method not allowed" });
    return;
  }

  const collection = await kv.exists(collectionId);

  if (!collection) {
    res.status(404).json({ status: "collection not found" });
    return;
  }

  if (method === "POST") {
    await kv.lpush(collectionId, beerId);
  } else if (method === "DELETE") {
    await kv.lrem(collectionId, -1, beerId);
  }

  const ids = await kv.lrange<number>(collectionId, 0, -1);

  res.status(200).json({ status: "ok", ids });
};

export default controller;

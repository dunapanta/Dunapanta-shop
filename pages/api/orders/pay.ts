// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    

  return res.status(200).json({ message: "Order paid" });
};

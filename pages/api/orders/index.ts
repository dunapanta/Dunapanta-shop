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
      return createOrder(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }

  res.status(200).json({ message: "John Doe" });
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(201).json({ message: "Order created" });
};

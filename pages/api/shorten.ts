import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;

  res.status(200).json({ url: url });
};

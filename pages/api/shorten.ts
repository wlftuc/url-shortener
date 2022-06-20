import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma"; // TYPE SAFE WOHOOO!

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;

  

  res.status(200).json({ url: url });
};

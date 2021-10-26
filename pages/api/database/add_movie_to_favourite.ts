import { addToFavourite } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, movieId } = req.body;
  await addToFavourite(email, movieId);
  res.send({ received: true });
};

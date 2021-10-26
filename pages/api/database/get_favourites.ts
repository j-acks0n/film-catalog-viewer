import { getAllFavourites } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

module.exports = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      user: { email },
    } = getSession(req, res);
    const favourites = (await getAllFavourites(email));

    res.send({ received: true, favourites });
  }
);

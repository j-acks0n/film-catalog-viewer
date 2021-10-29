import { getAllFavourites } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

module.exports = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const favourites = (await getAllFavourites(session?.user.email));

    res.send({ received: true, favourites });
  }
);

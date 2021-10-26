import { createUser } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, secret } = JSON.parse(req.body);
  console.log(JSON.parse(req.body))
  if (secret === process.env.AUTH0_HOOK_SECRET) {
    try {
      await createUser(email);
      res.send({ received: true });
    } catch (err) {
      console.log(err);
      res.send({ received: true });
    }
  } else {
    console.log("You forgot to send me your secret!");
    res.send("You forgot to send me your secret!");
  }
};

import type { NextApiRequest, NextApiResponse } from "next";

import Language from "../../../../languagetrdata.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(Language);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.statusCode = 200;
}

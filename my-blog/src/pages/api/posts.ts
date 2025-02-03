import { NextApiRequest, NextApiResponse } from "next";

type Post = {
  id: number;
  title: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts: Post[] = [
    { id: 1, title: "API Routeの使い方" },
    { id: 2, title: "Next.jsのAPIルートを理解する" },
  ];
  res.status(200).json(posts);
}

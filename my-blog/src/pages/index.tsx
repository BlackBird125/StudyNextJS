import Link from "next/link";
import { GetStaticProps } from "next";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

// ダミーデータ
const dummyPosts: Post[] = [
  { id: 1, title: "Next.jsの基本を学ぶ" },
  { id: 2, title: "getStaticPropsとは？" },
  { id: 3, title: "ReactとNext.jsの違い" },
];

// SSG（静的データ取得）
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: dummyPosts,
    },
    revalidate: 10, // ISR: 10秒ごとに再生成
  };
};

export default function Home({ posts }: Props) {
  return (
    <div>
      <h1>ブログ一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
        <li>
          <Link href={`/fetch`}>from api</Link>
        </li>
      </ul>
    </div>
  );
}

import { GetStaticProps, GetStaticPaths } from "next";

type Post = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  post: Post;
};

// ダミーデータ（通常はAPIやDBから取得）
const dummyPosts: Post[] = [
  {
    id: 1,
    title: "Next.jsの基本を学ぶ",
    content: "Next.jsはReactのフレームワークです。",
  },
  {
    id: 2,
    title: "getStaticPropsとは？",
    content: "getStaticPropsはビルド時にデータを取得します。",
  },
  { id: 3, title: "ReactとNext.jsの違い", content: "Next.jsはSSRが可能です。" },
];

// `getStaticPaths` で事前に生成するパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = dummyPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false }; // 事前に生成されていないページは404
};

// `getStaticProps` でデータを取得
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = dummyPosts.find((p) => p.id.toString() === params?.id);

  if (!post) {
    return { notFound: true }; // 存在しない記事の場合は404を返す
  }

  return {
    props: { post },
  };
};

// 記事詳細ページのコンポーネント
export default function PostPage({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

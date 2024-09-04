import { useParams } from "react-router-dom";
import { useFetch } from "@/hook/api";
import { Post } from "@/types/post";
import { TypographyP } from "@/components/ui/typography";

const Posts = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    loading,
    error,
  } = useFetch<Post>(`http://localhost:4000/api/posts/${slug}`);


  const createdDate = post?.created_at ? new Date(post.created_at) : null;
  const day = createdDate ? createdDate.getDate() : null;
  const month = createdDate ? createdDate.getMonth() + 1 : null; // Les mois commencent à partir de 0, donc on ajoute 1
  const year = createdDate ? createdDate.getFullYear() : null;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="py-8 px-4 sm:px-24 lg:px-60">
      <div className="max-w-7xl mx-auto shadow-lg">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <p className="text-gray-500">author: {post.author}</p>
            <p className="text-gray-500">{`${day}/${month}/${year}`}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="prose max-w-none">
              <TypographyP className="lg:px-24 lg:py-9">{post.content}</TypographyP>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;

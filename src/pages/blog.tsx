import HeroSection from "@/components/heroSection";
import { useFetch } from "@/hook/api";
import CardPost from "@/components/cardPost";
import { Post } from "@/types/post";

export default function Homme() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>("http://localhost:4000/api/listposts");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <HeroSection />
      <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 mx-12">
        {posts?.map((post) => (
          <CardPost
            key={post.slug}
            title={post.title}
            author={post.author}
            slug={post.slug}
            summary={post.summary}
            category={post.category}
            created_at={post.created_at}
          />
        ))}
      </div>
    </>
  );
}

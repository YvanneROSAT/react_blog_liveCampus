import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Suppression du token JWT
    navigate("/admin"); // Redirection vers la page de login
  };

  // Fonction pour récupérer la liste des articles
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/listposts");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Fonction pour supprimer un article
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setArticles(articles.filter((article) => article._id !== id));
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Vérification de l'authentification
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin"); // Redirige vers la page de login si le token n'existe pas
    }
  }, [navigate]);

  // Récupération des articles à l'affichage du dashboard
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <div className="flex justify-end py-5 mb-10 shadow-lg">
        <Button onClick={handleLogout} className="mr-5">
          Log Out
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-10 ml-8">Welcome to the Admin Dashboard</h1>
        <div className=" mb-10 ml-24">
            <Button onClick={() => navigate("/admin/create")} size="lg" className="bg-green-500 text-white px-4 py-2">Create posts</Button>
        </div>
      {/* Liste des articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-24">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className="p-4 border rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-4">By {article.author}</p>
              <p className="text-sm text-gray-800 mb-4">{article.summary}</p>
              <div className="flex justify-between">
                <Button
                  className="bg-blue-500 text-white px-4 py-2"
                  onClick={() => navigate(`/admin/edit/${article._id}`)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputWithLabel } from "@/components/inputWithLabel";
import { TextareaWithLabel } from "@/components/textareaWithLabel";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [slugArticle, setSlugArticle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!title || !author || !summary || !content || !slugArticle || !category) {
      console.error("Some required fields are missing");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          summary,
          content,
          slug: slugArticle,
          category,
        }),
      });

      if (response.ok) {
        navigate("/admin/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Failed to create the post", errorData);
      }
    } catch (error) {
      console.error("Error creating the post:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-6">Create New Article</h1>

      <InputWithLabel
        type="text"
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        classNameInput="mb-4"
      />

      <InputWithLabel
        type="text"
        id="slug"
        label="Slug"
        value={slugArticle}
        onChange={(e) => setSlugArticle(e.target.value)}
        placeholder="Slug"
        classNameInput="mb-4"
      />

      <InputWithLabel
        type="text"
        id="author"
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        classNameInput="mb-4"
      />

      <TextareaWithLabel
        id="summary"
        label="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Summary"
        classNameTextarea="mb-4"
      />

      <TextareaWithLabel
        id="content"
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        classNameTextarea="mb-4"
      />

      {/* Select Category */}
      <Select value={category} onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleCreate} className="bg-blue-500">
        Create Article
      </Button>
    </div>
  );
}
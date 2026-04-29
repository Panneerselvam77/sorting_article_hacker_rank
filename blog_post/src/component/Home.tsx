import type React from "react";
import { useState } from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";

export interface Post {
  id: string;
  title: string;
  description: string;
}

// Renamed from `Error` to avoid shadowing the built-in JS Error class
interface FormErrors {
  title?: string;
  description?: string;
}

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<Omit<Post, "id">>({
    title: "",
    description: "",
  });
  const [posts, setPosts] = useState<Post[]>([]);
  // Errors are now stored in state so they can be rendered in the UI
  const [errors, setErrors] = useState<FormErrors>({});

  const validateInput = (): boolean => {
    const newErrors: FormErrors = {};
    if (!inputValue.title.trim()) newErrors.title = "Title is required";
    if (!inputValue.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreatePost = (): void => {
    if (!validateInput()) return;
    setPosts((prev) => [
      ...prev,
      {
        // Use a stable unique ID instead of title to safely identify posts
        id: crypto.randomUUID(),
        title: inputValue.title.trim(),
        description: inputValue.description.trim(),
      },
    ]);
    setInputValue({ title: "", description: "" });
    setErrors({});
  };

  // Delete by unique `id` — avoids the bug where posts sharing a title all get deleted
  const handleDeletePost = (id: string): void => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1>Home</h1>
      <Input
        setInputValue={setInputValue}
        inputValue={inputValue}
        errors={errors}
      />
      <button onClick={handleCreatePost}>Create Post</button>
      <div>
        <PostDisplay posts={posts} handleDeletePost={handleDeletePost} />
      </div>
    </div>
  );
};

export default Home;

import type React from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";
import { useState } from "react";

export interface InputValue {
  title: string;
  description: string;
}
interface Error {
  title?: string;
  description?: string;
}

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<InputValue>({
    title: "",
    description: "",
  });
  const [arrValue, setArrValue] = useState<InputValue[]>([]);

  const validateInput = (): boolean => {
    const err: Error = {};
    if (!inputValue.title) err.title = "Title is required";
    if (!inputValue.description) err.description = "Description is required";
    return Object.keys(err).length === 0;
  };

  const handleCreatPost = (): void => {
    if (!validateInput()) return;
    setArrValue((prev) => [...prev, inputValue]);
    setInputValue({ title: "", description: "" });
  };

  const handleDeletePost = (index: string): void => {
    setArrValue((prev) => prev.filter((item) => item.title !== index));
  };
  return (
    <div>
      <h1>Home</h1>
      <Input setInputValue={setInputValue} inputValue={inputValue} />
      <button onClick={handleCreatPost}>Create Post</button>
      <div>
        <PostDisplay arrValue={arrValue} handleDeletePost={handleDeletePost} />
      </div>
    </div>
  );
};

export default Home;

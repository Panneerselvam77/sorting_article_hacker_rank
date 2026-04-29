import type React from "react";
import type { InputValue } from "./Home";

interface InputProps {
  arrValue: InputValue[];
  handleDeletePost: (index: string) => void;
}

const PostDisplay: React.FC<InputProps> = ({ arrValue, handleDeletePost }) => {
  return (
    <div>
      <h1>Post Display</h1>
      {arrValue.map((post, index) => (
        <div className="post-container" key={index}>
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <button onClick={() => handleDeletePost(post.title)}>
              Delete Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDisplay;

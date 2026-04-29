import type React from "react";
import type { Post } from "./Home";

interface PostDisplayProps {
  posts: Post[];
  handleDeletePost: (id: string) => void;
}

const PostDisplay: React.FC<PostDisplayProps> = ({
  posts,
  handleDeletePost,
}) => {
  return (
    <div>
      <h2>Post Display</h2>
      {posts.length === 0 && <p>No posts yet. Create one above!</p>}
      {posts.map((post) => (
        // Use stable unique `id` as key instead of array index.
        // Index keys cause React to mis-identify elements when the list order changes (e.g. on delete).
        <div className="post-container" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
};

export default PostDisplay;

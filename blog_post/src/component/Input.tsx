import type React from "react";

interface InputProps {
  setInputValue: React.Dispatch<
    React.SetStateAction<{ title: string; description: string }>
  >;
  inputValue: { title: string; description: string };
}

const Input: React.FC<InputProps> = ({ setInputValue }) => {
  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, description: e.target.value }))
          }
        ></textarea>
      </div>
    </div>
  );
};

export default Input;

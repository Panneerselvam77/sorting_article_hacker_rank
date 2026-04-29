import type React from "react";

interface FormErrors {
  title?: string;
  description?: string;
}

interface InputProps {
  setInputValue: React.Dispatch<
    React.SetStateAction<{ title: string; description: string }>
  >;
  inputValue: { title: string; description: string };
  errors: FormErrors;
}

// `inputValue` is now used to make inputs controlled — they clear after submission.
// `errors` is now received and rendered below each field.
const Input: React.FC<InputProps> = ({ setInputValue, inputValue, errors }) => {
  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={inputValue.title}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        {errors.title && <span role="alert">{errors.title}</span>}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={inputValue.description}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        {errors.description && <span role="alert">{errors.description}</span>}
      </div>
    </div>
  );
};

export default Input;

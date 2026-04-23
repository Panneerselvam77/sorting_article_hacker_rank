import { useState } from "react";

interface FormData {
  name: string;
  age: string;
  email: string;
}
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function FormComp() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validationRules = (): Record<
    keyof FormData,
    (value: string | null) => string | undefined
  > => {
    return {
      name: (value: string | null) => {
        if (!value) return "Name is required";
      },
      age: (value: string | null) => {
        if (!value) return "Age is required";
      },
      email: (value: string | null) => {
        if (!value) return "Email is required";
      },
    };
  };

  const validation = () => {
    const err: FormErrors = {};
    if (!formData.name) {
      const nameError = validationRules().name(formData.name);
      if (nameError) err.name = nameError;
    }
    if (!formData.age) {
      const ageError = validationRules().age(formData.age);
      if (ageError) err.age = ageError;
    }
    if (!formData.email) {
      const emailError = validationRules().email(formData.email);
      if (emailError) err.email = emailError;
    }
    return {
      err: err,
      isValid: Object.keys(err).length === 0,
    };
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { err, isValid } = validation();
    if (!isValid) {
      setErrors(err);
    } else {
      setErrors({});
      console.log("Form submitted successfully", formData);
    }
  };
  return (
    <div>
      <h1>FormComp</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          {errors.age && <span style={{ color: "red" }}>{errors.age}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

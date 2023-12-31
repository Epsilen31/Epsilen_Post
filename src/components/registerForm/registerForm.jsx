"use client";

import { useState } from "react";
import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await register(formData);

    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      router.push("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
        value={formData.passwordRepeat}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;

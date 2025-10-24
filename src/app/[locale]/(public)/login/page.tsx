"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { TOnChangeInputEvent, TOnSubmitFormEvent } from "@/common/types";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState<{
    values: { username: string; password: string };
    isLoading: boolean;
    errMsg: string;
  }>({
    values: {
      username: "emilys",
      password: "emilyspass",
    },
    isLoading: false,
    errMsg: "",
  });

  const handleChange = (e: TOnChangeInputEvent) => {
    setForm({
      ...form,
      values: { ...form.values, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e: TOnSubmitFormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false, // tự handle redirect
      username: form.values.username,
      password: form.values.password,
      callbackUrl,
    });

    if (result?.error) {
      console.log(result.error);
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={form.values.username}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

"use client";

import { useState, FormEvent } from "react";
import { trpc } from "@/lib/api/trpc/client";
import Link from "next/link";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState<
    { id: string; email: string } | { error: string } | null
  >(null);

  const loginMutation = trpc.user.login.useMutation({
    onSuccess: (data) => {
      setLoginResult(data);
      // eslint-disable-next-line no-undef
      console.log("Login successful:", data);
    },
    onError: (error) => {
      setLoginResult({ error: error.message });
      // eslint-disable-next-line no-undef
      console.error("Login failed:", error);
    },
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login Test</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          style={{ padding: "10px 20px" }}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <Link
          href="/register"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Don't have an account? Register here
        </Link>
      </div>

      {loginResult && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h3>Result:</h3>
          <pre>{JSON.stringify(loginResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, FormEvent } from "react";
import { trpc } from "@/lib/api/trpc/client";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registerResult, setRegisterResult] = useState<
    { success: boolean } | { error: string } | null
  >(null);

  const registerMutation = trpc.user.register.useMutation({
    onSuccess: () => {
      setRegisterResult({ success: true });
      console.log("Registration successful");
    },
    onError: (error) => {
      setRegisterResult({ error: error.message });
      console.error("Registration failed:", error);
    },
  });

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, name, password });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              minLength={8}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={registerMutation.isPending}
          style={{ padding: "10px 20px" }}
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Already have an account? Login here
        </Link>
      </div>

      {registerResult && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h3>Result:</h3>
          {"success" in registerResult ? (
            <div style={{ color: "green" }}>
              Registration successful! You can now login.
            </div>
          ) : (
            <div style={{ color: "red" }}>
              Error: {registerResult.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
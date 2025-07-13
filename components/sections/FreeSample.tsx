// components/FreeSample.tsx
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const FreeSample: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // After success, reset status back to idle after 5s
  useEffect(() => {
    if (status === "success") {
      const timeout = setTimeout(() => setStatus("idle"), 5000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="free-sample" className="py-16 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">Not Decided Yet?</h1>
        <p className="mt-2 text-lg sm:text-2xl font-medium mb-3">
          Get a <span className="text-custom">free</span> sample by signing up
          to our email list
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-[#111] rounded-lg shadow-lg relative"
        >
          {/* Arrow button above the input */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="p-2 hover:bg-custom/20 rounded-full disabled:opacity-50 transition absolute top-1/2 right-3 -translate-y-1/2"
          >
            {status === "loading" ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              <ArrowRight className="h-6 w-6 text-white" />
            )}
          </button>

          {/* Wide email input */}
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
            className="
          w-full max-w-xl
          px-4 py-3
          bg-transparent
          border-2 border-custom
          rounded-md
          placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-custom
        "
          />
        </form>

        {/* feedback messages */}
        <div className="mt-4 min-h-[1.5rem]">
          {status === "success" && (
            <p className="text-green-400">🎉 Success! Check your inbox soon.</p>
          )}
          {status === "error" && (
            <p className="text-red-500">
              ❌ Oops! Something went wrong. Try again?
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreeSample;

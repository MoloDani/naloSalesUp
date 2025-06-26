import React, { useState, useEffect } from "react";

// Extend Window to include MailerLite API
declare global {
  interface Window {
    ml?: (...args: any[]) => void;
  }
}

const FreeSample: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Inject MailerLite Universal script
    const script = document.createElement("script");
    script.src = "https://assets.mailerlite.com/js/universal.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize MailerLite
      window.ml && window.ml("account", "1378633");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    if (window.ml) {
      // Subscribe user to list
      window.ml(
        "subscribe",
        {
          email: email,
        },
        "1378633"
      );
      setStatus("Thanks for subscribing! Check your inbox for a free sample.");
      setEmail("");
    } else {
      setStatus("Subscription service is unavailable. Please try again later.");
    }
  };

  return (
    <section id="free-sample">
      <div className="flex flex-col items-center mt-10 mb-20">
        <h1 className="text-3xl sm:text-6xl font-bold">Not Decided Yet?</h1>
        <p className="text-base sm:text-lg lg:text-2xl mt-1 font-semibold">
          Get a <span className="text-custom">free</span> sample by signing up
          to our email list
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="px-4 py-2 mb-4 border border-green-500 rounded-md bg-black text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Get Free Sample
          </button>
        </form>
        {status && <p className="mt-4 text-center text-green-400">{status}</p>}
      </div>
    </section>
  );
};

export default FreeSample;

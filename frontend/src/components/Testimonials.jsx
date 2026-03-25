import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";

const FALLBACK = [
  { name: "Youssef B.", age: 27, city: "Tunis", message: "Service rapide et soigné, je recommande." },
  { name: "Nesrine K.", age: 24, city: "Sfax", message: "Bon échange, deadlines respectées." },
  { name: "Mehdi A.", age: 30, city: "La Marsa", message: "Interface claire et moderne, merci !" },
  { name: "Sarra M.", age: 29, city: "Ariana", message: "Très réactif, il a corrigé mon app vite." },
  { name: "Amine H.", age: 26, city: "Sousse", message: "Code propre, communication top." },
  { name: "Meriem L.", age: 32, city: "Nabeul", message: "Comprend bien les besoins business." },
];

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", city: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState("idle");

  const rebuildList = (approved = []) => {
    // Newest (DB-approved) first, then fallback seed items as older.
    const sortedApproved = [...approved].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    const combined = [...sortedApproved, ...FALLBACK];
    setAllItems(combined);
    setItems(combined.slice(0, 3));
    setHasMore(combined.length > 3);
    setPage(1);
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/testimonials?page=1&limit=100`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      rebuildList(data.items || []);
    } catch (err) {
      rebuildList([]); // fallback only
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleLoadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    const nextSlice = allItems.slice(0, nextPage * 3);
    setItems(nextSlice);
    setPage(nextPage);
    setHasMore(nextSlice.length < allItems.length);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    try {
      const res = await fetch(`${BACKEND_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          age: form.age ? Number(form.age) : undefined,
          city: form.city,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitStatus("success");
      setForm({ name: "", age: "", city: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setTimeout(() => setSubmitStatus("idle"), 2000);
    }
  };

  return (
    <section className="section-surface py-16 text-white">
      <div className="max-w-6xl mx-auto px-6 space-y-8 relative z-10">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.32em] text-blue-300">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-black">What people are saying</h2>
          <p className="text-white/60 text-sm md:text-base">
            Real notes from clients and peers. New submissions appear after approval.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, idx) => (
            <article
              key={`${t._id || t.name}-${idx}`}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="font-semibold text-white">{t.name}</span>
                <span>{t.age ? `${t.age} ans` : ""}</span>
              </div>
              {t.city && <p className="text-white/40 text-xs">{t.city}, Tunisia</p>}
              <p className="mt-3 text-white/80 text-sm leading-relaxed">{t.message}</p>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLoadMore}
            disabled={!hasMore || loading}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10 disabled:opacity-40"
          >
            {loading ? "Loading..." : hasMore ? "Show more" : "No more"}
          </button>
          <span className="text-white/40 text-xs">Showing {items.length} entries</span>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-4">
          <h3 className="text-xl font-bold">Write a review</h3>
          <p className="text-white/60 text-sm">
            Your note will be sent for approval before it appears publicly.
          </p>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-3">
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400/70 focus:outline-none"
              />
              <input
                name="age"
                type="number"
                min="10"
                max="120"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400/70 focus:outline-none"
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400/70 focus:outline-none"
              />
            </div>

            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your feedback"
              className="w-full rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400/70 focus:outline-none resize-none"
            />

            <button
              type="submit"
              disabled={submitStatus === "sending"}
              className="w-full rounded-md bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:bg-blue-50 active:scale-98 disabled:opacity-60"
            >
              {submitStatus === "sending"
                ? "Sending..."
                : submitStatus === "success"
                ? "Sent !☀️"
                : submitStatus === "error"
                ? "Try again"
                : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

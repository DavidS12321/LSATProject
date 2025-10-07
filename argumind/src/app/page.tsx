import { AuthForm } from "@/components/auth/auth-form";

const features = [
  {
    title: "Adaptive Prep",
    description: "AI-crafted logic drills that learn from every response."
  },
  {
    title: "Seamless Sync",
    description: "Progress transfers instantly between web and mobile."
  },
  {
    title: "Mentor Insights",
    description: "Conversational feedback that keeps you exam-ready."
  }
];

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-24 sm:pt-32">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-primary-200">
            Argumind
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Master the LSAT with an AI co-pilot that knows how you think.
          </h1>
          <p className="max-w-xl text-base text-slate-300 sm:text-lg">
            Argumind pairs cutting-edge AI with proven reasoning frameworks to sharpen your logic, pacing, and confidence. Start on the web and stay in sync with our upcoming mobile app.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a className="btn-primary" href="#get-started">
              Get started
            </a>
            <a className="text-sm font-medium text-slate-300 hover:text-white" href="#learn-more">
              Learn more
            </a>
          </div>
        </div>
        <div className="space-y-4" id="get-started">
          <AuthForm />
        </div>
      </div>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" id="learn-more">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-slate-800/80 bg-slate-950/40 p-8 shadow-lg shadow-black/30">
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-slate-800/60 pt-8 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Argumind Labs. All rights reserved.</p>
      </footer>
    </main>
  );
}

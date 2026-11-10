import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vw] h-[90vh] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25),transparent_60%)]"
      />
      <div className="container-custom relative">
        <p className="font-display font-bold text-[clamp(6rem,22vw,16rem)] leading-[0.8] tracking-[-0.06em] text-outline">
          404
        </p>
        <h1 className="mt-6 font-display font-bold text-white text-4xl sm:text-6xl tracking-[-0.035em] leading-[1.02]">
          This page doesn&apos;t exist
          <span className="text-secondary-300" aria-hidden="true">.</span>
        </h1>
        <p className="mt-5 text-lg text-white/60 max-w-[48ch]">
          The link may be old or mistyped. Everything is on the home page, and the resume has its own page.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-light">
            Go to the portfolio
          </Link>
          <Link href="/resume" className="btn-secondary">
            View resume
          </Link>
        </div>
      </div>
    </section>
  );
}

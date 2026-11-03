import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="container-custom">
        <p className="font-display font-bold text-primary text-lg">404</p>
        <h1 className="mt-3 font-display font-bold text-dark-900 text-5xl sm:text-6xl tracking-[-0.035em] leading-[1.02]">
          This page doesn&apos;t exist
          <span className="text-secondary-400" aria-hidden="true">.</span>
        </h1>
        <p className="mt-5 text-lg text-dark-500 max-w-[48ch]">
          The link may be old or mistyped. Everything is on the home page, and the resume has its own page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
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

import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            flipit.
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/blog/all"
              className="px-4 py-2 rounded-md hover:bg-slate-50 transition-colors inline-block"
            >
              Blog
            </Link>

            <Link
              href="/pricing"
              className="px-4 py-2 rounded-md hover:bg-slate-50 transition-colors inline-block"
            >
              Pricing
            </Link>

            <Link
              href="/signin"
              className="px-4 py-2 rounded-md hover:bg-slate-50 transition-colors inline-block"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors inline-block"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

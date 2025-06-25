import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, LogIn } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900">
          Welcome to the Secure RBAC Blog Platform
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          A demonstration of full-stack development with Next.js, Node.js, and
          Role-Based Access Control. Sign up or log in to explore posts and see
          the RBAC system in action.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link href="/signup">
            <Button className="flex items-center bg-slate-900 hover:bg-slate-800 text-white text-lg px-8 py-6">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button className="flex items-center bg-white hover:bg-gray-100 text-slate-900 border border-slate-300 text-lg px-8 py-6">
              <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

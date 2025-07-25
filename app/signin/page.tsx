'use client';
import SignInForm from "../../components/SignInForm";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Image src="/images/logo.jpg" alt="Curtains and Covers Logo" width={48} height={48} className="rounded-full shadow" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full px-4">
        <div className="w-full max-w-md">
          <SignInForm />
          <div className="mt-6 text-center text-gray-500 text-sm">
            <span>Don&apos;t have an account? </span>
            <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">Sign up</Link>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-4 w-full text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} Curtains and Covers</footer>
    </div>
  );
}       
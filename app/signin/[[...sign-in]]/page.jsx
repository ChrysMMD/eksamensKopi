'use client';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-xl rounded-2xl p-8 border border-gray-200 bg-white",
            headerTitle: "text-2xl font-bold text-gray-800",
            headerSubtitle: "text-sm text-gray-500",
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white font-bold rounded-md py-2",
            formFieldInput: "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500",
          },
          variables: {
            colorPrimary: "#16a34a",
            fontFamily: "Inter, sans-serif",
          },
        }}
      />
    </div>
  );
}

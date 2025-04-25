"use client";
import { useUser, useStackApp, UserButton } from "@stackframe/stack";

export default function PageClient() {
  const user = useUser();
  const app = useStackApp();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center">
            <UserButton />
            <p className="text-2xl font-semibold text-gray-900">
              Welcome, {user.displayName ?? "unnamed user"}
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Your e-mail: {user.primaryEmail}
            </p>
            <button
              onClick={() => user.signOut()}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-center text-xl text-gray-900 mb-4">
            You are not logged in
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => app.redirectToSignIn()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </button>
            <button
              onClick={() => app.redirectToSignUp()}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Next.js Chat UI Demo</h1>
      <Link href="/chat" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Go to Chat</Link>
    </main>
  );
}

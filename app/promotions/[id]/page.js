import Link from "next/link";

export default async function PromotionDetails({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-8">
      <div className="bg-white p-8 rounded shadow max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Promotion Details
        </h1>
        <p className="text-gray-600 mb-8">
          Details for promotion ID:{" "}
          <span className="font-mono text-blue-500">{id}</span>
        </p>
        <Link href="/promotions" className="text-blue-500 hover:underline">
          ← Back to All Promotions
        </Link>
      </div>
    </div>
  );
}

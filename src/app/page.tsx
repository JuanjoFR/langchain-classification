"use client";

import { useState } from "react";
import { getData } from "../server-actions";

type Data = {
  sentiment: string;
  aggressiveness: number;
  language: string;
};

export default function Home() {
  const [data, setData] = useState<Data | null>(null);

  const fetchData = async () => {
    const result = await getData();
    setData(result);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fetch Data
        </button>
        {data && (
          <pre className="mt-4 p-4 bg-white rounded shadow">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

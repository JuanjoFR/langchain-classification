"use client";

import { useState } from "react";
import { extractClassificationData } from "../server-actions";
import { ClassificationData } from "@/schemas";

export default function Home() {
  const [classificationData, setClassificationData] =
    useState<ClassificationData | null>(null);

  const fetchData = async () => {
    const data = await extractClassificationData();
    setClassificationData(data);
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
        {classificationData && (
          <pre className="mt-4 p-4 bg-white rounded shadow">
            {JSON.stringify(classificationData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

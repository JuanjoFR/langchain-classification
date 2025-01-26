import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import MessageClassificationForm from "@/components/MessageClassificationForm";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Message Classification</CardTitle>
          <CardDescription>
            Enter your message to classify its sentiment, aggressiveness, and
            language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <React.Suspense fallback={<div>Loading...</div>}>
            <MessageClassificationForm />
          </React.Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

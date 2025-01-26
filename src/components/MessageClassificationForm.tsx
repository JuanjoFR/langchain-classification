"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { extractClassificationData } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClassificationData } from "@/schemas/classification-data";
import { formValuesSchema, FormValues } from "@/schemas/form-values";

export default function MessageClassificationForm() {
  const [result, setResult] = React.useState<ClassificationData | null>(null);
  const [isClassifying, setIsClassifying] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsClassifying(true);
    setResult(null); // Clear old result while waiting
    const formData = new FormData();
    formData.append("message", values.message);
    const response = await extractClassificationData(formData);
    setResult(response);
    setIsClassifying(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isClassifying}>
          {isClassifying ? "Classifying..." : "Classify Message"}
        </Button>
        {isClassifying && (
          <Alert className="bg-blue-50">
            <AlertTitle>Classifying</AlertTitle>
            <AlertDescription>
              Please wait while we classify your message...
            </AlertDescription>
          </Alert>
        )}
        {result && !isClassifying && (
          <Alert className="bg-green-50">
            <AlertTitle>Classification Result</AlertTitle>
            <AlertDescription>
              <div className="mt-2">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}

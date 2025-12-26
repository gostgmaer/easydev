"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto text-center">
        {/* Large 404 */}
        <div className="relative">
          404
          <Search className="h-16 w-16 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Page Not Found</h2>
          <p className="text-lg text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Back Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            If you think this is a mistake, please{" "}
            <Link href="/#contact" className="text-primary hover:underline">
              contact me
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

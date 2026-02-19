import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getToolById, getToolsByCategory } from "@/lib/tools-data";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function AlternativesPage() {
  const [match, params] = useRoute("/alternatives/:toolName");

  if (!match) return null;

  const tool = getToolById(params.toolName as string);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container py-12">
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-slate-900">Tool not found</h1>
            <p className="text-slate-600 mt-2">The tool you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const alternatives = getToolsByCategory(tool.category).filter((t) => t.id !== tool.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <div className="container py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Alternatives to {tool.name}
          </h1>
          <p className="text-lg text-slate-600">
            Explore {alternatives.length} other tools in the {tool.category} category
          </p>
        </div>

        {/* Alternatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {alternatives.map((alt) => (
            <Link key={alt.id} href={`/tools/${alt.id}`}>
              <Card className="p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{alt.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{alt.category}</p>
                <p className="text-slate-600 mb-4 flex-grow">{alt.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Pricing:</span>
                    <span className="font-semibold text-slate-900">{alt.pricing}</span>
                  </div>
                  {alt.rating && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Rating:</span>
                      <span className="font-semibold text-slate-900">{alt.rating}/5.0</span>
                    </div>
                  )}
                </div>

                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Card>
            </Link>
          ))}
        </div>

        {/* Comparison CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Want a detailed comparison?</h3>
          <p className="text-slate-600 mb-6">
            Select any alternative above to compare it directly with {tool.name}
          </p>
          <Link href={`/tools/${tool.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to {tool.name}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

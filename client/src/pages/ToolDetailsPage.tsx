import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getToolById, getToolsByCategory } from "@/lib/tools-data";
import { useRoute } from "wouter";
import { ArrowLeft, Check, X, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function ToolDetailsPage() {
  const [match, params] = useRoute("/tools/:toolName");

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

  const relatedTools = getToolsByCategory(tool.category).filter((t) => t.id !== tool.id).slice(0, 3);

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
        {/* Tool Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{tool.name}</h1>
              <p className="text-lg text-slate-600">{tool.description}</p>
            </div>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6">
            <span className="text-sm font-semibold text-slate-500">PRICING</span>
            <p className="text-lg font-semibold text-slate-900 mt-2">{tool.pricing}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {tool.pricingTier}
            </span>
          </Card>
          <Card className="p-6">
            <span className="text-sm font-semibold text-slate-500">CATEGORY</span>
            <p className="text-lg font-semibold text-slate-900 mt-2">{tool.category}</p>
          </Card>
          {tool.users && (
            <Card className="p-6">
              <span className="text-sm font-semibold text-slate-500">USERS</span>
              <p className="text-lg font-semibold text-slate-900 mt-2">
                {(tool.users / 1000000).toFixed(1)}M+
              </p>
            </Card>
          )}
          {tool.rating && (
            <Card className="p-6">
              <span className="text-sm font-semibold text-slate-500">RATING</span>
              <p className="text-lg font-semibold text-slate-900 mt-2">{tool.rating}/5.0</p>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pros */}
            <Card className="p-8 bg-green-50 border-green-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Pros</h3>
              <ul className="space-y-3">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Cons */}
            <Card className="p-8 bg-red-50 border-red-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Cons</h3>
              <ul className="space-y-3">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{con}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Best For */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="font-semibold text-slate-900 mb-3">Best For</h4>
              <p className="text-slate-700">{tool.bestFor}</p>
            </Card>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <Card className="p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Similar Tools in {tool.category}</h4>
                <div className="space-y-3">
                  {relatedTools.map((relatedTool) => (
                    <Link key={relatedTool.id} href={`/tools/${relatedTool.id}`}>
                      <div className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                        <div className="font-semibold text-slate-900 text-sm">{relatedTool.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{relatedTool.pricing}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            {/* Alternatives */}
            <Link href={`/alternatives/${tool.id}`}>
              <Button variant="outline" className="w-full">
                View Alternatives
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">Want to compare {tool.name} with another tool?</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

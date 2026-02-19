import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getToolById } from "@/lib/tools-data";
import { useRoute } from "wouter";
import { ArrowLeft, Check, X } from "lucide-react";
import { Link } from "wouter";

export default function ComparisonPage() {
  const [match, params] = useRoute("/compare/:toolA-vs-:toolB");

  if (!match) return null;

  const toolA = getToolById((params as any).toolA);
  const toolB = getToolById((params as any).toolB);

  if (!toolA || !toolB) {
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
            <h1 className="text-2xl font-bold text-slate-900">Comparison not found</h1>
            <p className="text-slate-600 mt-2">The tools you're looking for don't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Collect all unique features from both tools
  const allFeatures = Array.from(new Set([...toolA.features, ...toolB.features]));

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
        {/* Comparison Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {toolA.name} vs {toolB.name}
          </h1>
          <p className="text-lg text-slate-600">
            Detailed comparison of {toolA.category}
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[toolA, toolB].map((tool) => (
            <Card key={tool.id} className="p-8 border-2 border-slate-200 hover:border-blue-400 transition">
              <Link href={`/tools/${tool.id}`}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 cursor-pointer hover:text-blue-600 transition">
                  {tool.name}
                </h2>
              </Link>
              <p className="text-slate-600 mb-6">{tool.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-sm font-semibold text-slate-500">PRICING</span>
                  <p className="text-lg font-semibold text-slate-900">{tool.pricing}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-500">CATEGORY</span>
                  <p className="text-lg font-semibold text-slate-900">{tool.category}</p>
                </div>
                {tool.users && (
                  <div>
                    <span className="text-sm font-semibold text-slate-500">USERS</span>
                    <p className="text-lg font-semibold text-slate-900">
                      {(tool.users / 1000000).toFixed(1)}M+
                    </p>
                  </div>
                )}
                {tool.rating && (
                  <div>
                    <span className="text-sm font-semibold text-slate-500">RATING</span>
                    <p className="text-lg font-semibold text-slate-900">{tool.rating}/5.0</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {tool.pros.slice(0, 3).map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {tool.cons.slice(0, 3).map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">{toolA.name}</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">{toolB.name}</th>
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, i) => (
                  <tr key={i} className={`border-b border-slate-200 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    <td className="py-4 px-4 text-slate-900 font-medium">{feature}</td>
                    <td className="text-center py-4 px-4">
                      {toolA.features.includes(feature) ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {toolB.features.includes(feature) ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best For Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-slate-900 mb-2">Best For {toolA.name}</h4>
            <p className="text-slate-700">{toolA.bestFor}</p>
          </Card>
          <Card className="p-6 bg-amber-50 border-amber-200">
            <h4 className="font-semibold text-slate-900 mb-2">Best For {toolB.name}</h4>
            <p className="text-slate-700">{toolB.bestFor}</p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">Want to see more comparisons?</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Explore More Tools
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

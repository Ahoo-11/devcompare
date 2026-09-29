import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tools, categories } from "@/lib/tools-data";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:categoryName");

  if (!match) return null;

  const categoryName = (params.categoryName as string).replace(/-/g, " ");
  const categoryTools = tools.filter((tool) => tool.category.toLowerCase() === categoryName.toLowerCase());

  if (categoryTools.length === 0) {
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
            <h1 className="text-2xl font-bold text-slate-900">Category not found</h1>
            <p className="text-slate-600 mt-2">The category you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const actualCategory = categoryTools[0].category;

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
            {actualCategory}
          </h1>
          <p className="text-lg text-slate-600">
            Browse {categoryTools.length} tools in this category
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.id}`}>
              <Card className="p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.name}</h3>
                <p className="text-slate-600 mb-4 flex-grow line-clamp-2">{tool.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Pricing:</span>
                    <span className="font-semibold text-slate-900 text-sm">{tool.pricing}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Card>
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Other Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.filter((cat) => cat !== actualCategory).map((category) => (
              <Link key={category} href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Button variant="outline" className="w-full justify-start">
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

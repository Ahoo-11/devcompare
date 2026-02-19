import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories, searchTools, getToolsByCategory } from "@/lib/tools-data";
import { Search, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = searchQuery ? searchTools(searchQuery) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">DevCompare</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition">
              Home
            </Link>
            <a href="#categories" className="text-slate-600 hover:text-slate-900 transition">
              Categories
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Compare Developer Tools & SaaS Products
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Make informed decisions with detailed comparisons, feature matrices, and expert insights
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search tools, frameworks, databases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-base rounded-lg border-slate-300"
            />
          </div>

          {/* Search Results */}
          {searchQuery && searchResults.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {searchResults.slice(0, 6).map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.id}`}>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition cursor-pointer text-left">
                    <div className="font-semibold text-slate-900">{tool.name}</div>
                    <div className="text-sm text-slate-500">{tool.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Featured Comparisons */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Popular Comparisons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/compare/react-vs-vue">
              <Card className="p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">React vs Vue</h4>
                    <p className="text-sm text-slate-600">Frontend Frameworks</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
            </Link>
            <Link href="/compare/nextjs-vs-nuxt">
              <Card className="p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">Next.js vs Nuxt</h4>
                    <p className="text-sm text-slate-600">Meta Frameworks</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
            </Link>
            <Link href="/compare/postgresql-vs-mongodb">
              <Card className="p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">PostgreSQL vs MongoDB</h4>
                    <p className="text-sm text-slate-600">Databases</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
            </Link>
            <Link href="/compare/docker-vs-kubernetes">
              <Card className="p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">Docker vs Kubernetes</h4>
                    <p className="text-sm text-slate-600">Containerization</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="bg-white border-t border-slate-200 py-16">
        <div className="container">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Browse by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const toolCount = getToolsByCategory(category).length;
              return (
                <Link key={category} href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Card className="p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer">
                    <h4 className="font-semibold text-slate-900 mb-2">{category}</h4>
                    <p className="text-sm text-slate-500">{toolCount} tools</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container text-center">
          <p className="mb-2">DevCompare © 2025</p>
          <p className="text-sm text-slate-400">
            Helping developers make informed decisions about tools and technologies
          </p>
        </div>
      </footer>
    </div>
  );
}

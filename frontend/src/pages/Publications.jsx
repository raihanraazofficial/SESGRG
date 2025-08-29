import React, { useState, useMemo } from "react";
import { Search, Filter, FileText, ExternalLink, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { publications } from "../mock/data";

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("year");

  const categories = ["all", "Machine Learning", "Renewable Energy", "Cybersecurity", "Sustainability"];

  const filteredPublications = useMemo(() => {
    let filtered = publications.filter((pub) => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort publications
    filtered.sort((a, b) => {
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "citations") return b.citationCount - a.citationCount;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const PublicationCard = ({ publication }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">
              {publication.category}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {publication.year}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 leading-tight hover:text-emerald-600 transition-colors">
            {publication.title}
          </h3>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-2" />
            {publication.authors.join(", ")}
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Journal:</strong> {publication.journal}</p>
            <p>
              <strong>Publication:</strong> Vol. {publication.volume}
              {publication.issue && `, Issue ${publication.issue}`}
              {publication.pages && `, pp. ${publication.pages}`}
            </p>
            {publication.doi && (
              <p><strong>DOI:</strong> {publication.doi}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                <strong>Citations:</strong> {publication.citationCount}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                <FileText className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button size="sm" variant="outline" className="text-gray-600">
                <ExternalLink className="h-4 w-4 mr-1" />
                DOI
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our research contributions to the scientific community in sustainable energy and smart grid technologies.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-emerald-600">{publications.length}</p>
            <p className="text-sm text-gray-600">Total Publications</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600">
              {publications.reduce((sum, pub) => sum + pub.citationCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Citations</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-purple-600">2024</p>
            <p className="text-sm text-gray-600">Latest Year</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-600">{categories.length - 1}</p>
            <p className="text-sm text-gray-600">Research Areas</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search publications by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="citations">Citations</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredPublications.length} of {publications.length} publications
            </p>
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
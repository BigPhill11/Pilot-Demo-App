import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronRight, 
  BookOpen, 
  GraduationCap,
  Building2,
  ArrowLeft
} from "lucide-react";
import { 
  getAllCategories, 
  getCategoryById,
  getFlashcardsBySubsection,
  FlashcardSection,
  FlashcardSubsection,
  CategorizedFlashcard
} from "@/data/flashcard-categories";

interface CategoryBrowserProps {
  onSelectCards: (cards: CategorizedFlashcard[], title: string) => void;
}

export const CategoryBrowser = ({ onSelectCards }: CategoryBrowserProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'personal-finance':
        return <BookOpen className="h-8 w-8" />;
      case 'careers-finance':
        return <GraduationCap className="h-8 w-8" />;
      case 'company-knowledge':
        return <Building2 className="h-8 w-8" />;
      default:
        return <BookOpen className="h-8 w-8" />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'personal-finance':
        return 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800';
      case 'careers-finance':
        return 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800';
      case 'company-knowledge':
        return 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800';
      default:
        return 'from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20 border-gray-200 dark:border-gray-800';
    }
  };

  if (selectedCategory) {
    const category = getCategoryById(selectedCategory);
    if (!category) return null;

    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setSelectedCategory(null)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {getCategoryIcon(category.id)}
            <h2 className="text-3xl font-bold">{category.title}</h2>
          </div>
          <p className="text-muted-foreground">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.subsections.map((subsection) => (
            <Card
              key={subsection.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg border-2 ${getCategoryColor(category.id)}`}
              onClick={() => {
                const cards = getFlashcardsBySubsection(category.id, subsection.id);
                onSelectCards(cards, subsection.title);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{subsection.icon}</div>
                <Badge variant="secondary">
                  {subsection.cards.length} cards
                </Badge>
              </div>

              <h3 className="text-xl font-bold mb-2">{subsection.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {subsection.description}
              </p>

              <div className="flex items-center text-sm font-medium text-primary">
                Study Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Learning Path</h2>
        <p className="text-muted-foreground">
          Select a category to explore flashcards organized by topic
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const totalCards = category.subsections.reduce(
            (sum, sub) => sum + sub.cards.length,
            0
          );

          return (
            <Card
              key={category.id}
              className={`p-8 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 border-2 bg-gradient-to-br ${getCategoryColor(category.id)}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-background/50 mb-4">
                  {getCategoryIcon(category.id)}
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sections</span>
                  <span className="font-bold">{category.subsections.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Cards</span>
                  <span className="font-bold">{totalCards}</span>
                </div>
              </div>

              <div className="flex items-center justify-center text-sm font-medium text-primary">
                Explore
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h4 className="font-bold mb-1">Study Tips</h4>
            <p className="text-sm text-muted-foreground">
              Use spaced repetition to maximize retention. The system will automatically schedule reviews based on your performance and confidence ratings.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

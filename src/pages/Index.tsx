
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IngredientInput from "@/components/IngredientInput";
import DietaryPreferences from "@/components/DietaryPreferences";
import SkillLevelSelect from "@/components/SkillLevelSelect";
import RecipeResults from "@/components/RecipeResults";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietaryPreference, setDietaryPreference] = useState("any");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerateRecipes = () => {
    if (ingredients.length === 0) {
      toast({
        title: "Ingredients Required",
        description: "Please add at least one ingredient to generate recipes.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
      
      toast({
        title: "Recipes Generated",
        description: "Successfully created personalized recipes based on your ingredients!",
      });
      
      // Scroll to results
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 2500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <section id="ingredients-section" className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Create Your Recipe</h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                  Tell us what ingredients you have on hand, your dietary preferences, and cooking skill level to generate personalized recipes.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">What ingredients do you have?</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter ingredients that you want to use in your recipe or upload a photo of your ingredients.
                  </p>
                  <IngredientInput onIngredientsChange={setIngredients} />
                </div>
                
                <DietaryPreferences 
                  selectedPreference={dietaryPreference} 
                  onPreferenceChange={setDietaryPreference}
                />
                
                <SkillLevelSelect 
                  selectedSkillLevel={skillLevel} 
                  onSkillLevelChange={setSkillLevel}
                />
                
                <Button 
                  onClick={handleGenerateRecipes}
                  className="w-full bg-recipe-terracotta hover:bg-recipe-terracotta/90 text-white"
                  size="lg"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Recipes...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Recipes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {(showResults || isGenerating) && (
          <section id="results-section" className="py-16">
            <div className="container px-4 md:px-6">
              <RecipeResults isLoading={isGenerating} />
            </div>
          </section>
        )}
        
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

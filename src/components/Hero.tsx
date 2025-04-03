
import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";

const Hero = () => {
  const scrollToIngredients = () => {
    const ingredientsSection = document.getElementById("ingredients-section");
    if (ingredientsSection) {
      ingredientsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl animate-fade-in">
            Turn Your Ingredients Into Delicious 
            <span className="text-recipe-terracotta"> AI-Generated Recipes</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Tell us what's in your kitchen, and our AI will create personalized recipes 
            tailored to your dietary preferences and cooking skill level.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              className="bg-recipe-terracotta hover:bg-recipe-terracotta/90 text-white font-medium"
              onClick={scrollToIngredients}
            >
              Create Recipe Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-recipe-olive text-recipe-olive hover:bg-recipe-olive/10"
            >
              Learn More
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollToIngredients}
            className="animate-bounce mt-12 opacity-70 hover:opacity-100"
          >
            <ArrowDownCircle className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

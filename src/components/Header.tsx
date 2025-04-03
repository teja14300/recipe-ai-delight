
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const scrollToIngredients = () => {
    const ingredientsSection = document.getElementById("ingredients-section");
    if (ingredientsSection) {
      ingredientsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-recipe-olive" />
          <span className="font-bold text-xl text-recipe-olive">Recipe AI</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="default" 
            className="font-medium bg-recipe-olive hover:bg-recipe-olive/90"
            onClick={scrollToIngredients}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

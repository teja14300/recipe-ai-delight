
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { ChefHat, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { logout, user } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

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
          {user && (
            <div className="text-sm text-muted-foreground mr-2">
              Hello, <span className="font-medium">{user.name}</span>
            </div>
          )}
          <ThemeToggle />
          <Button 
            variant="default" 
            className="font-medium bg-recipe-olive hover:bg-recipe-olive/90"
            onClick={scrollToIngredients}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

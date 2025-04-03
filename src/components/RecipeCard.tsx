
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, CircleSlash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  skillLevel: string;
  imageUrl: string;
  nutrition: Nutrition;
  dietaryPreferences: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes > 0 ? `${remainingMinutes} min` : ''}`;
  };

  const getSkillLevelIcon = (level: string) => {
    switch (level) {
      case "beginner":
        return <ChefHat className="h-4 w-4 mr-1" />;
      case "intermediate":
        return (
          <>
            <ChefHat className="h-4 w-4 mr-1" />
            <ChefHat className="h-4 w-4 mr-1" />
          </>
        );
      case "advanced":
        return (
          <>
            <ChefHat className="h-4 w-4 mr-1" />
            <ChefHat className="h-4 w-4 mr-1" />
            <ChefHat className="h-4 w-4 mr-1" />
          </>
        );
      default:
        return <ChefHat className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-md recipe-card-shadow">
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{
          backgroundImage: recipe.imageUrl
            ? `url(${recipe.imageUrl})`
            : "url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&h=600&auto=format&fit=crop)",
        }}
      />
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {recipe.dietaryPreferences.map((pref) => (
            <Badge
              key={pref}
              variant="outline"
              className="bg-recipe-olive/10 text-recipe-olive border-recipe-olive/30"
            >
              {pref}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl">{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTime(totalTime)}</span>
          </div>
          <div className="flex items-center">
            {getSkillLevelIcon(recipe.skillLevel)}
            <span className="capitalize">{recipe.skillLevel}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Nutrition (per serving)</h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Calories</p>
                <p className="text-lg">{recipe.nutrition.calories}</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Protein</p>
                <p className="text-lg">{recipe.nutrition.protein}g</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Carbs</p>
                <p className="text-lg">{recipe.nutrition.carbs}g</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Fat</p>
                <p className="text-lg">{recipe.nutrition.fat}g</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
                <li key={index} className="text-sm">{ingredient}</li>
              ))}
              {recipe.ingredients.length > 5 && (
                <li className="text-sm text-muted-foreground">
                  + {recipe.ingredients.length - 5} more
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-4">
        <Button className="w-full bg-recipe-olive hover:bg-recipe-dark-olive">
          View Full Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;

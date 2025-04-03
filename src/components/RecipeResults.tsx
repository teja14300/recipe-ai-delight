
import React from "react";
import RecipeCard from "./RecipeCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock recipe data
const mockRecipes = [
  {
    id: "1",
    title: "Creamy Tomato Pasta with Garlic and Herbs",
    description:
      "A simple yet delicious pasta dish with a creamy tomato sauce infused with garlic and fresh herbs.",
    ingredients: [
      "8 oz pasta",
      "2 tablespoons olive oil",
      "3 cloves garlic, minced",
      "1 can (14 oz) diced tomatoes",
      "1/2 cup heavy cream",
      "1/4 cup fresh basil, chopped",
      "Salt and pepper to taste",
      "Grated Parmesan cheese for serving",
    ],
    instructions: [
      "Cook pasta according to package instructions.",
      "In a large skillet, heat olive oil over medium heat.",
      "Add garlic and cook for 30 seconds until fragrant.",
      "Add diced tomatoes and simmer for 10 minutes.",
      "Stir in heavy cream and cook for 2 more minutes.",
      "Add drained pasta to the sauce and toss to coat.",
      "Mix in fresh herbs and season with salt and pepper.",
      "Serve hot with grated Parmesan cheese.",
    ],
    prepTime: 10,
    cookTime: 20,
    skillLevel: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=1000&h=600&auto=format&fit=crop",
    nutrition: { calories: 450, protein: 12, carbs: 60, fat: 18 },
    dietaryPreferences: ["Vegetarian"],
  },
  {
    id: "2",
    title: "Chicken & Vegetable Stir-Fry",
    description:
      "A quick and nutritious stir-fry loaded with colorful vegetables and tender chicken pieces.",
    ingredients: [
      "1 lb boneless chicken breast, sliced",
      "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
      "3 tablespoons soy sauce",
      "1 tablespoon vegetable oil",
      "2 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "1 teaspoon sesame oil",
      "2 green onions, sliced",
    ],
    instructions: [
      "Heat vegetable oil in a wok or large skillet over high heat.",
      "Add chicken pieces and cook for 4-5 minutes until browned.",
      "Add garlic and ginger, cook for 30 seconds.",
      "Add mixed vegetables and stir-fry for 3-4 minutes until crisp-tender.",
      "Pour in soy sauce and cook for 2 more minutes.",
      "Drizzle with sesame oil and garnish with green onions.",
      "Serve hot with rice or noodles.",
    ],
    prepTime: 15,
    cookTime: 15,
    skillLevel: "intermediate",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&h=600&auto=format&fit=crop",
    nutrition: { calories: 320, protein: 35, carbs: 15, fat: 12 },
    dietaryPreferences: ["Gluten-Free"],
  },
  {
    id: "3",
    title: "Mediterranean Quinoa Salad",
    description:
      "A refreshing and protein-packed salad with Mediterranean flavors and rainbow vegetables.",
    ingredients: [
      "1 cup quinoa, cooked",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, finely chopped",
      "1/2 cup Kalamata olives, pitted",
      "1/2 cup feta cheese, crumbled",
      "3 tablespoons olive oil",
      "2 tablespoons lemon juice",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook quinoa according to package instructions and let it cool.",
      "In a large bowl, combine quinoa, cucumber, tomatoes, red onion, and olives.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over the salad and toss gently to combine.",
      "Sprinkle feta cheese on top and serve chilled.",
    ],
    prepTime: 15,
    cookTime: 15,
    skillLevel: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?q=80&w=1000&h=600&auto=format&fit=crop",
    nutrition: { calories: 280, protein: 8, carbs: 32, fat: 15 },
    dietaryPreferences: ["Vegetarian", "Gluten-Free"],
  },
];

const RecipeResults = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="space-y-4 text-center">
          <RefreshCw className="mx-auto h-12 w-12 animate-spin text-recipe-olive" />
          <h3 className="text-xl font-medium">Generating recipes...</h3>
          <p className="text-muted-foreground">
            Our AI is working on creating delicious recipes with your ingredients
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Recipe Suggestions</h2>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate More Recipes
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="quick">Quick (&lt;30 min)</TabsTrigger>
          <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
          <TabsTrigger value="gluten-free">Gluten-Free</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="quick" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecipes
              .filter((recipe) => recipe.prepTime + recipe.cookTime < 30)
              .map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="vegetarian" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecipes
              .filter((recipe) =>
                recipe.dietaryPreferences.includes("Vegetarian")
              )
              .map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="gluten-free" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecipes
              .filter((recipe) =>
                recipe.dietaryPreferences.includes("Gluten-Free")
              )
              .map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecipeResults;

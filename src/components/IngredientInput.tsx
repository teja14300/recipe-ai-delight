
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Camera, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput = ({ onIngredientsChange }: IngredientInputProps) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addIngredient = () => {
    if (inputValue.trim()) {
      const newIngredients = [...ingredients, inputValue.trim()];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
      setInputValue("");
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addIngredient();
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Process the image
    setIsUploading(true);
    
    // Display the file being processed
    toast({
      title: "Processing Image",
      description: `Analyzing ${file.name} to detect ingredients...`,
    });

    // Simulate API call for ingredient detection
    setTimeout(() => {
      // Mock detected ingredients - in a real app, this would be an API call
      const detectedIngredients = ["onion", "tomato", "chicken", "garlic"];
      const newIngredients = [...ingredients, ...detectedIngredients];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
      setIsUploading(false);
      
      toast({
        title: "Ingredients Detected",
        description: `Found ${detectedIngredients.length} ingredients in your image`,
      });

      // Reset the file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Enter an ingredient (e.g., chicken, rice, tomatoes)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
          {inputValue && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setInputValue("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          type="button"
          onClick={addIngredient}
          disabled={!inputValue.trim()}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Camera className="mr-2 h-4 w-4" />
          )}
          {isUploading ? "Detecting..." : "Upload Image"}
        </Button>
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <Badge
            key={`${ingredient}-${index}`}
            variant="secondary"
            className="pl-3 pr-1 py-1.5 text-sm font-medium"
          >
            {ingredient}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="ml-1 h-5 w-5 p-0 hover:bg-transparent"
              onClick={() => removeIngredient(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        {ingredients.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Add ingredients to get started
          </p>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;

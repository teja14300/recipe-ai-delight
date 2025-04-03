
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Preference {
  id: string;
  name: string;
  description: string;
}

interface DietaryPreferencesProps {
  selectedPreference: string;
  onPreferenceChange: (preference: string) => void;
}

const DietaryPreferences = ({
  selectedPreference,
  onPreferenceChange,
}: DietaryPreferencesProps) => {
  const preferences: Preference[] = [
    {
      id: "any",
      name: "Any",
      description: "No specific dietary preferences",
    },
    {
      id: "vegetarian",
      name: "Vegetarian",
      description: "No meat, fish, or poultry",
    },
    {
      id: "vegan",
      name: "Vegan",
      description: "No animal products",
    },
    {
      id: "gluten-free",
      name: "Gluten-Free",
      description: "No gluten-containing ingredients",
    },
    {
      id: "keto",
      name: "Keto",
      description: "Low carb, high fat diet",
    },
    {
      id: "paleo",
      name: "Paleo",
      description: "Based on foods presumed eaten by early humans",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Dietary Preferences</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {preferences.map((preference) => (
          <div
            key={preference.id}
            className={cn(
              "relative rounded-md border-2 p-4 cursor-pointer transition-all",
              selectedPreference === preference.id
                ? "border-recipe-olive bg-recipe-olive/10"
                : "border-border hover:border-recipe-olive/50"
            )}
            onClick={() => onPreferenceChange(preference.id)}
          >
            <div className="flex items-start gap-3">
              {selectedPreference === preference.id && (
                <div className="absolute top-2 right-2">
                  <Check className="h-5 w-5 text-recipe-olive" />
                </div>
              )}
              <div>
                <h4 className="font-medium">{preference.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {preference.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietaryPreferences;

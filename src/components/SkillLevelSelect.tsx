
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SkillLevel {
  id: string;
  name: string;
  description: string;
}

interface SkillLevelSelectProps {
  selectedSkillLevel: string;
  onSkillLevelChange: (skillLevel: string) => void;
}

const SkillLevelSelect = ({
  selectedSkillLevel,
  onSkillLevelChange,
}: SkillLevelSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const skillLevels: SkillLevel[] = [
    {
      id: "beginner",
      name: "Beginner",
      description: "Simple recipes with basic techniques",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      description: "More complex techniques and ingredients",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Challenging recipes with advanced techniques",
    },
  ];

  const selectedLevel = skillLevels.find(
    (level) => level.id === selectedSkillLevel
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Cooking Skill Level</h3>
      <div className="relative">
        <div
          className={cn(
            "flex items-center justify-between rounded-md border p-4 cursor-pointer",
            isOpen ? "border-recipe-olive ring-1 ring-recipe-olive" : ""
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <p className="font-medium">{selectedLevel?.name}</p>
            <p className="text-sm text-muted-foreground">
              {selectedLevel?.description}
            </p>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen ? "transform rotate-180" : ""
            )}
          />
        </div>

        {isOpen && (
          <div className="absolute mt-1 w-full rounded-md border bg-popover shadow-md z-10">
            <div className="p-1">
              {skillLevels.map((level) => (
                <div
                  key={level.id}
                  className={cn(
                    "flex items-center justify-between rounded-sm px-3 py-2 cursor-pointer hover:bg-accent",
                    selectedSkillLevel === level.id
                      ? "bg-accent text-accent-foreground"
                      : ""
                  )}
                  onClick={() => {
                    onSkillLevelChange(level.id);
                    setIsOpen(false);
                  }}
                >
                  <div>
                    <p className="font-medium">{level.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {level.description}
                    </p>
                  </div>
                  {selectedSkillLevel === level.id && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillLevelSelect;

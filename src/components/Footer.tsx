
import { ChefHat } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-6 mt-16">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-recipe-olive" />
            <span className="font-bold text-recipe-olive">Recipe AI</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Recipe AI. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-recipe-olive transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-recipe-olive transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-recipe-olive transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

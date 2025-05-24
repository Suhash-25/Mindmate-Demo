
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BrainLogo from "@/components/BrainLogo";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/5 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <BrainLogo size={60} />
        <h1 className="text-6xl font-bold font-display mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl text-foreground/80 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button 
          onClick={() => navigate("/")}
          size="lg"
          className="px-8"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

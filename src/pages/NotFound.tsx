
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold font-display mb-6 text-mindmate-primary">404</h1>
        <p className="text-xl text-mindmate-dark mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="mindmate-btn mindmate-btn-primary"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

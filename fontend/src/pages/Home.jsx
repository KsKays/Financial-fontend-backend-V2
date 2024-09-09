import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <SignedOut>
        <h1 className="text-4xl md:text-5xl md:leading-snug font-bold my-2 ">
          Welcome to your own Personal Financial Tracker
        </h1>
      </SignedOut>
      <SignedIn>
        <Navigate to="/Dashboard" />
      </SignedIn>
    </div>
  );
};

export default Home;

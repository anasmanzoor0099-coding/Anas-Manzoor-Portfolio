import fs from "node:fs";
import path from "node:path";
import PortfolioPage from "@/components/PortfolioPage";

export default function HomePage() {
  // Only request the portrait when the file really exists, so a missing
  // public/images/profile.png never causes a 404 in the browser console.
  const hasProfileImage = fs.existsSync(
    path.join(process.cwd(), "public", "images", "profile.png")
  );

  return <PortfolioPage hasProfileImage={hasProfileImage} />;
}

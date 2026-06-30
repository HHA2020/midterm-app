import { products, categories } from "./assets/data";
import {
  Cable,
  Headphones,
  Laptop,
  Mouse,
  Settings,
  TabletSmartphone,
} from "lucide-react";

function CategoryIcon(category) {
  switch (category.icon) {
    case "mouse":
      return <Mouse className="h-5 w-5 text-blue-600" />;
    case "laptop":
      return <Laptop className="h-5 w-5 text-blue-600" />;
    case "tablet-smartphone":
      return <TabletSmartphone className="h-5 w-5 text-blue-600" />;
    case "headphones":
      return <Headphones className="h-5 w-5 text-blue-600" />;
    case "cable":
      return <Cable className="h-5 w-5 text-blue-600" />;
    default:
      return <Settings className="h-5 w-5 text-blue-600" />;
  }
}

export default function Home() {
  /**
   * Your code goes here.
   * Tailwind CSS has been installed and configured but it is not strictly required.
   */
}

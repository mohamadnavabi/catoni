import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";

function Navigation() {
  return (
    <ul className="nc-Navigation flex items-center">
      {NAVIGATION_DEMO.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;

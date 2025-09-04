import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { MenuItem, menuItems } from "@/lib/menu-config";

export function useFilteredMenu(): MenuItem[] {
  const { data: session } = useSession();
  
  const filteredMenuItems = useMemo(() => {
    if (!session?.user?.userType) {
      return [];
    }

    const userType = session.user.userType;

    const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
      return items.filter((item) => {
        // If no allowedUserTypes specified, allow for all users
        if (!item.allowedUserTypes) {
          return true;
        }
        
        // Check if current user type is allowed
        const isAllowed = item.allowedUserTypes.includes(userType);
        
        if (!isAllowed) {
          return false;
        }

        // If item has children, filter them recursively
        if (item.children) {
          item.children = filterMenuItems(item.children);
        }

        return true;
      });
    };

    return filterMenuItems([...menuItems]);
  }, [session?.user?.userType]);

  return filteredMenuItems;
}
import { isAuthenticated } from "@/libs/auth";

export default function WishlistPage() {
  const auth = isAuthenticated();

  return <div>WishlistPage</div>;
}

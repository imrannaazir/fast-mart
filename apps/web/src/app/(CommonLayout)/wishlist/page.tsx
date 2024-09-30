import { isAuthenticated } from "@/libs/auth";

export default function WishlistPage() {
  const auth = isAuthenticated();
  console.log(auth);

  return <div>WishlistPage</div>;
}

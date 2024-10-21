"use client";

import { useFetcher } from "@/hooks/use-fetcher";
import { useGetSession } from "@/libs/auth-utils";

const Playground: React.FC = () => {
  const clientFetcher = useFetcher();
  const { session } = useGetSession();

  (async function () {
    const data = await clientFetcher(`/wishlist-items/${session?.user?.userId}`);
    console.log(data, "58");
  })();
  return <p>Playground</p>;
};

export default Playground;

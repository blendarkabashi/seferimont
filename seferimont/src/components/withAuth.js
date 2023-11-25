import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "./Loader";

export default function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const isAuthenticated = localStorage.getItem("token");

        if (!isAuthenticated) {
          router.push("/");
        } else {
          setIsLoading(false);
        }
      }
    }, [router]);

    if (isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;
  };
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BootstrapClient = () => {
  const pathname = usePathname();

  useEffect(() => {
    // 動態引入 Bootstrap JavaScript
    const importBootstrap = async () => {
      if (typeof window !== "undefined") {
        // 引入 Bootstrap JS
        await import("bootstrap/dist/js/bootstrap.bundle.min.js");
      }
    };

    console.log("我現在在", pathname);

    importBootstrap();
  }, [pathname]);

  return null;
};

export default BootstrapClient;

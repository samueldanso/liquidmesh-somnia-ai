import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Web3 App Template - Web3 Starter Kit",
    short_name: "Web3 App Template - Web3 Starter Kit",
    description: "Web3 App Template - Web3 Starter Kit",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
  };
}

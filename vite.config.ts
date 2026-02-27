import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // URL base do site (pode ser configurada via variável de ambiente)
  const siteUrl = process.env.VITE_SITE_URL || "https://classicprotecaoveicular.com.br";
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      // Plugin para injetar a URL base no HTML durante o build
      {
        name: "inject-site-url",
        transformIndexHtml: {
          enforce: "pre",
          transform(html, ctx) {
            return html.replace(/https:\/\/classicprotecaoveicular\.com\.br/g, siteUrl);
          },
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

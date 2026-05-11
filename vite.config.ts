import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Keep font filenames stable so <link rel="preload"> in index.html
        // can reference them by a fixed URL across builds. Fonts come from
        // @fontsource (immutable upstream files), so cache-busting via hash
        // is not needed.
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? assetInfo.name ?? "";
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) {
            return "assets/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        // Split heavy vendors into stable chunks so route changes don't
        // invalidate them, and the browser can parallelize their downloads
        // over HTTP/2. Firebase is intentionally not grouped — it's loaded
        // lazily by the app (see lib/firebase.ts) and Vite already emits one
        // chunk per Firebase sub-module on demand.
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-router")) return "react-vendor";
          if (/node_modules[\\/]react[\\/]/.test(id)) return "react-vendor";
          if (/node_modules[\\/]react-dom[\\/]/.test(id)) return "react-vendor";
          if (/node_modules[\\/]scheduler[\\/]/.test(id)) return "react-vendor";

          if (id.includes("gsap")) return "gsap";
          if (id.includes("lenis")) return "lenis";

          if (id.includes("lucide-react") || id.includes("react-icons"))
            return "icons";
        },
      },
    },
  },
});

import path from 'path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** `vite preview` סטטי ברירת מחדל לא תמיד מפנה נתיבי SPA ל־index.html — זה גורם ל־404 על /thank-you */
function spaPreviewFallback(): Plugin {
  return {
    name: 'spa-preview-fallback',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const accept = req.headers.accept ?? ''
        if (!accept.includes('text/html')) {
          next()
          return
        }
        const pathname = (req.url ?? '').split('?')[0] ?? ''
        if (pathname === '/' || pathname === '' || pathname === '/index.html') {
          next()
          return
        }
        if (path.extname(pathname) !== '') {
          next()
          return
        }
        req.url = '/index.html'
        next()
      })
    },
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    spaPreviewFallback(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

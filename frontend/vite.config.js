import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Brotli compression
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    })
  ],
  
  // Image optimization settings
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp', '**/*.avif'],
  
  build: {
    // Enable asset inlining for small images
    assetsInlineLimit: 4096, // 4kb - inline smaller images as base64
    
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
        passes: 2, // Multiple passes for better compression
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        warnings: false
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Smaller output chunks
    reportCompressedSize: false, // Faster builds
    
    // Source maps for production debugging (optional)
    sourcemap: false,
    
    rollupOptions: {
      output: {
        // Separate chunk for assets with better naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        
        // Aggressive code splitting strategy
        manualChunks: (id) => {
          // Vendor chunks - more granular splitting
          if (id.includes('node_modules')) {
            // Core React libraries together
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-core';
            }
            // Router separate
            if (id.includes('react-router-dom') || id.includes('react-router') || id.includes('@remix-run')) {
              return 'router';
            }
            // Animation library separate (heavy)
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            // Icons separate (tree-shakeable)
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Tailwind and CSS related
            if (id.includes('tailwindcss')) {
              return 'styles';
            }
            // Everything else
            return 'vendor';
          }
          
          // Split pages into individual chunks for better code splitting
          if (id.includes('/src/pages/')) {
            const pageName = id.split('/src/pages/')[1].split('.')[0].split('/')[0].toLowerCase();
            return `page-${pageName}`;
          }
          
          // Common components together
          if (id.includes('/src/Components/')) {
            return 'components';
          }
          
          // Context providers together
          if (id.includes('/src/context/')) {
            return 'context';
          }
        },
        
        // Generate separate chunks for CSS
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    }
  },
  
  // Enable compression
  server: {
    compress: true
  },
  
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['lucide-react'], // Icons can be tree-shaken
    esbuildOptions: {
      target: 'es2020',
      supported: {
        'top-level-await': true
      }
    }
  },
  
  // Modern build target for better tree-shaking
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    treeShaking: true
  }
})

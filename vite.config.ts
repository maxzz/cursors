import path, { dirname } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        react(),
        visualizer({
            filename: 'visualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@/ui': path.resolve(__dirname, './src/components/UI'),
            '@': path.resolve(__dirname, './src'),
        }
    }
});

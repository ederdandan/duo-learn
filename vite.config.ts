import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' gera caminhos relativos: funciona em https://<user>.github.io/duo-learn/
// sem precisar configurar o nome do repositório.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});

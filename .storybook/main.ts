import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        '@services/AuthServices': path.resolve(__dirname, '../__mocks__/@services/AuthServices.ts'),
        '@services/ProductServices': path.resolve(__dirname, '../__mocks__/@services/ProductServices.ts'),
        '@services/CartServices': path.resolve(__dirname, '../__mocks__/@services/CartServices.ts'),
        '@services/CategoryServices': path.resolve(__dirname, '../__mocks__/@services/CategoryServices.ts'),
        '@services/JobServices': path.resolve(__dirname, '../__mocks__/@services/JobServices.ts'),
        '@services/UserServices': path.resolve(__dirname, '../__mocks__/@services/UserServices.ts'),
        '@hooks/useGetUser': path.resolve(__dirname, '../__mocks__/@hooks/useGetUser.ts'),
      },
    };
    return config;
  },
};

export default config;

import type { SfaApi } from '../shared/types/api';

declare global {
  interface Window {
    sfaApi: SfaApi;
  }
}

export {};

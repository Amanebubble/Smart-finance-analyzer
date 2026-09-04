export interface SfaApi {
  ping(): Promise<string>;
  getAppVersion(): Promise<string>;
  openFileDialog(filters?: Array<{ name: string; extensions: string[] }>): Promise<string[]>;
}

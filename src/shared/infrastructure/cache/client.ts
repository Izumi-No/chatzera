export interface ICacheClient {
  getone(key: string): Promise<string | null>;
  getAllKeys(): Promise<string[]>;
  exists(key: string): Promise<boolean>;
  getAllKeyValue(): Promise<{ key: string; value: string }[]>;
  count(): Promise<number>;
}

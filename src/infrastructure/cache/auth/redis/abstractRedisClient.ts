import { ICacheClient } from "@/shared/infrastructure/cache/client";
import { redisConnection } from "./connection";
export abstract class AbstractRedisClient implements ICacheClient {
  protected client = redisConnection;

  async getone(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async getAllKeys(): Promise<string[]> {
    return await this.client.keys("*");
  }

  async exists(key: string): Promise<boolean> {
    return !!(await this.client.get(key));
  }

  async getAllKeyValue(): Promise<{ key: string; value: string }[]> {
    const keys = await this.getAllKeys();
    const values = await Promise.all(
      keys.map((key) => this.getone(key) as Promise<string>)
    );
    return keys.map((key, index) => ({ key, value: values[index] }));
  }

  async count(): Promise<number> {
    return (await this.getAllKeys()).length;
  }
}

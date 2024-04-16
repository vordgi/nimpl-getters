import type { AsyncLocalStorage } from "async_hooks";

export type ServerContext<T> = {
    Provider: ({ children, value }: { children: React.ReactNode; value: T }) => React.ReactNode;
    Consumer: ({ children }: { children: (context: T | undefined) => React.ReactNode }) => React.ReactNode;
    _storage: AsyncLocalStorage<{ value: T }>;
    _defaultValue: T | undefined;
};

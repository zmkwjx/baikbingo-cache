# baikbingo-cache

### 配置

```
import { createCache } from "@baikbingo/cache";
const cahce = createCache({
  databaseName： "cache", // 数据库名称
  tableName: "localStorage", // 表名
  version: 1 // 版本号
});
```

### 获取缓存操作

```
// 异步
const cahce = createCache();
cache.get(key).then(res => {
  console.log("结果", res);
});

// 同步
const res = cache.syncGet(key);

// 同步数据是要保证 数据遍历完成情况下才能获取（readAll）
// 所以可以在获取数据之前，重新赋值一下数据
// 在readAll方法下get一定能生效
cache.readAll().then(() => {
  const res = cache.syncGet(key);
});
// 或者
await cache.readAll();
const res = cache.syncGet(key);
```

### 异步操作

```
const cahce = createCache();
cache.set(key, value);
cache.del(key);
cache.clear();
```

### 同步操作

```
const cahce = createCache();
cache.syncSet(key, value);
cache.syncDel(key);
cache.syncClear();
```


### github

```
https://github.com/zmkwjx/baikbingo-cache
```

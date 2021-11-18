# baikbingo-cache

## Project setup

```
npm install
```

### 异步操作

```
const cahce = useCache();
cache.get(key).then(e => console.log(e));
cache.set(key, value);
cache.del(key);
cache.clear();
```

### 同步操作

```
const cahce = useCache();
cache.sync("get", key);
cache.sync("set", key, value);
cache.sync("del", key);
cache.sync("clear");
```


### github

```
https://github.com/zmkwjx/baikbingo-cache
```

/* 
 * @baikbingo/cache version 1.0.2 
 * description：Baikbingo 基于indexedDB的缓存解决
 * author：zmkwjx
 * 
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.bundle = global.bundle || {}, global.bundle.umd = global.bundle.umd || {}, global.bundle.umd.js = global.bundle.umd.js || {})));
})(this, (function (exports) { 'use strict';

  class Cache {
    constructor(params = {}) {
      this.databaseName = params.databaseName || "cache"; // 数据库名称

      this.tableName = params.databaseName || "localStorage"; // 表名

      this.version = params.version || 1; // 版本号

      this.memory = params.memory === false ? false : true; // 是否启用内存接管

      this.db = null; // 数据库对象

      this.source = {}; // 源数据=》内存

      this.init();
    } // 源数据内存接管


    setSource(key, value) {
      if (this.source && this.memory) {
        this.source[key] = value;
      } else {
        this.source = {};
      }
    } // 初始化


    async init() {
      try {
        this.db = await this.open();
        this.memory && this.readAll();
        console.log(`loaded cache，version ${this.version}`);
      } catch (e) {
        this.error(e);
      }
    } // 创建数据库


    create(db) {
      db.createObjectStore(this.tableName, {
        keyPath: "key"
      });
      console.log(`loaded cache create ${this.tableName}`);
    } // 打开数据库


    open() {
      return new Promise((resolve, reject) => {
        if (this.db) {
          resolve(this.db);
        } else {
          const {
            databaseName,
            version
          } = this;
          let request = window.indexedDB.open(databaseName, version); // 打开数据库失败

          request.onerror = e => reject(e); // 打开数据库成功


          request.onsuccess = e => resolve(e.target.result); // 数据库升级事件


          request.onupgradeneeded = e => this.create(e.target.result);
        }
      });
    } // 异常


    error(e) {
      console.log(new Error(e));
    } // 设置数据


    async set(key, value) {
      try {
        let res = await this.get(key);

        if (res) {
          return this.update(key, value);
        } else {
          return this.add(key, value);
        }
      } catch (e) {
        this.error(e);
        return Promise.reject(e);
      }
    }

    async syncSet(key, value) {
      const res = await this.set(key, value);
      return res;
    } // 新增


    async add(key, value) {
      this.db = await this.open();
      return new Promise((resolve, reject) => {
        let request = this.handler("readwrite").add({
          key,
          value
        });

        request.onsuccess = e => {
          this.source[key] = value;
          resolve(e);
        };

        request.onerror = e => reject(e);
      });
    } // 更新数据


    async update(key, value) {
      this.db = await this.open();
      return new Promise((resolve, reject) => {
        let request = this.handler("readwrite").put({
          key,
          value
        });

        request.onsuccess = e => {
          this.source[key] = value;
          resolve(e);
        };

        request.onerror = e => reject(e);
      });
    } // 返回数据


    async get(key) {
      this.db = await this.open();
      const value = this.syncGet(key);

      if (value) {
        return Promise.resolve(value);
      } else {
        return new Promise((resolve, reject) => {
          let request = this.handler("readonly").get(key);

          request.onsuccess = e => resolve(e.target.result);

          request.onerror = e => reject(e);
        });
      }
    }

    syncGet(key) {
      return this.source[key] || null;
    } // 删除数据


    async del(key) {
      try {
        let res = await this.get(key);

        if (res) {
          return new Promise((resolve, reject) => {
            let request = this.handler("readwrite").delete(key);

            request.onsuccess = e => {
              delete this.source[key];
              resolve(e);
            };

            request.onerror = e => reject(e);
          });
        } else {
          return Promise.resolve();
        }
      } catch (e) {
        this.error(e);
        return Promise.reject(e);
      }
    }

    async syncDel(key) {
      const res = await this.del(key);
      return res;
    } // 清空数据


    clear() {
      return new Promise((resolve, reject) => {
        const {
          databaseName
        } = this;
        let request = window.indexedDB.deleteDatabase(databaseName);

        request.onsuccess = e => {
          this.source = null;
          resolve(e);
        };

        request.onerror = e => reject(e);
      });
    }

    async syncClear() {
      const res = await this.clear();
      return res;
    } // 操作


    handler(mode = "readonly") {
      const {
        tableName
      } = this;
      return this.db.transaction([tableName], mode).objectStore(tableName);
    } // 遍历数据


    async readAll() {
      this.db = await this.open();
      let source = {};
      return new Promise(resolve => {
        let request = this.handler();

        request.openCursor().onsuccess = e => {
          const cursor = e.target.result;

          if (cursor) {
            source[cursor.key] = cursor.value.value;
            this.setSource(cursor.key, cursor.value.value);
            cursor.continue();
          } else {
            console.log("数据遍历完毕");
            resolve(source);
          }
        };
      });
    }

  }

  const createCache = function (params = {}) {
    const cache = new Cache(params);
    return cache;
  };
  const install = function (app, params = {}) {
    const cache = createCache(params);
    app.prototype && (app.prototype.$cache = cache);
    app.config && (app.config.globalProperties = cache);
  };

  exports.Cache = Cache;
  exports.createCache = createCache;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bundle.umd.js.map

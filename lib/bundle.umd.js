/* 
 * @baikbingo/cache version 1.0.0 
 * description：Baikbingo 基于indexedDB的缓存解决
 * author：zmkwjx
 * 
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@baikbingo/cache"] = global["@baikbingo/cache"] || {}));
})(this, (function (exports) { 'use strict';

  class Cache {
    databaseName = "cache"; // 数据库名称
    tableName = "localStorage"; // 表名
    version = 1; // 版本号

    db = null; // 数据库对象
    queue = null; // 队列

    constructor(params = {}) {
      params.databaseName && (this.databaseName = params.databaseName);
      params.tableName && (this.tableName = params.tableName);
      params.version && (this.version = params.version);
      this.init();
    }

    // 初始化
    async init() {
      try {
        this.db = await this.open();
        console.log(`loaded cache，version ${this.version}`);
      } catch (e) {
        this.error(e);
      }
    }

    // 创建数据库
    create(db) {
      db.createObjectStore(this.tableName, { keyPath: "key" });
      console.log(`loaded cache create ${this.tableName}`);
    }

    // 打开数据库
    open() {
      return new Promise((resolve, reject) => {
        if (this.db) {
          resolve(this.db);
        } else {
          const { databaseName, version } = this;
          let request = window.indexedDB.open(databaseName, version);
          // 打开数据库失败
          request.onerror = (e) => reject(e);
          // 打开数据库成功
          request.onsuccess = (e) => resolve(e.target.result);
          // 数据库升级事件
          request.onupgradeneeded = (e) => this.create(e.target.result);
        }
      });
    }

    // 异常
    error(e) {
      console.log(new Error(e));
    }

    // 同步方法
    async sync(action, ...params) {
      try {
        await this[action](...params);
      } catch (e) {
        this.error(e);
      }
    }

    // 设置数据
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

    // 新增
    async add(key, value) {
      this.db = await this.open();
      return new Promise((resolve, reject) => {
        let request = this.action("readwrite").add({ key, value });
        request.onsuccess = (e) => resolve(e);
        request.onerror = (e) => reject(e);
      });
    }

    // 更新数据
    async update(key, value) {
      this.db = await this.open();
      return new Promise((resolve, reject) => {
        let request = this.action("readwrite").put({ key, value });
        request.onsuccess = (e) => resolve(e);
        request.onerror = (e) => reject(e);
      });
    }

    // 返回数据
    async get(key) {
      this.db = await this.open();
      return new Promise((resolve, reject) => {
        let request = this.action("readonly").get(key);
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e);
      });
    }

    // 删除数据
    async del(key) {
      try {
        let res = await this.get(key);
        if (res) {
          return new Promise((resolve, reject) => {
            let request = this.action("readwrite").delete(key);
            request.onsuccess = (e) => resolve(e);
            request.onerror = (e) => reject(e);
          });
        } else {
          return Promise.resolve();
        }
      } catch (e) {
        this.error(e);
        return Promise.reject(e);
      }
    }

    // 清空数据
    clear() {
      return new Promise((resolve, reject) => {
        const { databaseName } = this;
        let request = window.indexedDB.deleteDatabase(databaseName);
        request.onerror = (e) => reject(e);
        request.onsuccess = (e) => resolve(e);
      });
    }

    // 操作
    action(mode = "readonly") {
      const { tableName } = this;
      return this.db.transaction([tableName], mode).objectStore(tableName);
    }
  }

  const useCahce = function(params = {}){
    const cache = new Cache(params);
    return cache;
  };

  const install = function(app, params = {}){
    const cache = useCahce(params);
    app.prototype && (app.prototype.$cache = cache);
    app.config && (app.config.globalProperties = cache);
  };

  exports.Cache = Cache;
  exports.install = install;
  exports.useCahce = useCahce;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bundle.umd.js.map
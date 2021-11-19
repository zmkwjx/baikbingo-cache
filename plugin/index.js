export { default as Cache} from "./object.class";
import Cache from "./object.class";

export const createCache = function(params = {}){
  const cache = new Cache(params);
  return cache;
};

export const install = function(app, params = {}){
  const cache = createCache(params);
  app.prototype && (app.prototype.$cache = cache);
  app.config && (app.config.globalProperties = cache);
};

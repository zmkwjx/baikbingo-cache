export { default as Cache} from "./object.class";
import Cache from "./object.class";

export const useCahce = function(params = {}){
  const cache = new Cache(params);
  return cache;
};

export const install = function(app, params = {}){
  const cache = useCahce(params);
  app.prototype && (app.prototype.$cache = cache);
  app.config && (app.config.globalProperties = cache);
};

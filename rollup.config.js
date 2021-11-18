import config from "./package.json";

// 构建信息
const banner = `/* 
 * ${config.name} version ${config.version} 
 * description：${config.description}
 * author：${config.author}
 * 
 */
`;

export default {
  input: "plugin/index.js",
  output: [
    {
      name: "@baikbingo/cache",
      file: "lib/bundle.umd.js",
      format: "umd",
      sourcemap: true,
      extend: true,
      banner
    },
    {
      name: "@baikbingo/cache",
      file: "lib/bundle.esm.js",
      format: "esm",
      sourcemap: true,
      extend: true,
      banner
    },
    {
      name: "@baikbingo/cache",
      file: "lib/bundle.min.js",
      format: "iife",
      sourcemap: true,
      extend: true,
      banner
    }
  ],
  plugins: []
};

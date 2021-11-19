import config from "./package.json";
import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import json from "rollup-plugin-json";

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
      name: "bundle.umd.js",
      file: "lib/bundle.umd.js",
      format: "umd",
      sourcemap: true,
      extend: true,
      banner
    },
    {
      name: "bundle.esm.js",
      file: "lib/bundle.esm.js",
      format: "esm",
      sourcemap: true,
      extend: true,
      banner
    },
    {
      name: "bundle.min.js",
      file: "lib/bundle.min.js",
      format: "iife",
      sourcemap: true,
      extend: true,
      banner
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    json()
  ]
};

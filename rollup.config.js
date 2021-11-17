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
    // CommonJS，适用于 Node 和 Browserify/Webpack
    {
      file: "lib/bundle.cjs.js",
      format: "cjs",
      banner
    },
    // 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    {
      file: "lib/bundle.esm.js",
      format: "es",
      banner
    }
  ],
  plugins: []
};

import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2"; 
import json from "@rollup/plugin-json";
const production = !process.env.ROLLUP_WATCH
// import copy from "rollup-plugin-copy";
// import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

const external = ["react"];
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const globals = {
  react: "React",
  reactRedux: "react-redux",
};

export default [
  {
    // input: ["src/index.ts", "src/components/input/Form/DynamicForm/index.tsx"], // For code splitting
    input: ["src/index.ts"],
    output: [
      {
        //dir: "build",
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        globals,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: "true",
        globals
      }
    ],
    //preserveModules: true, // For code splitting 
    external,
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true, sourceMap: false, inlineSources: true }), 
      json(),
      // postcss(),
      // copy({
      //   targets: [
      //     {
      //       src: "src/variables.scss",
      //       dest: "build",
      //       rename: "variables.scss"
      //     },
      //     {
      //       src: "src/typography.scss",
      //       dest: "build",
      //       rename: "typography.scss"
      //     }
      //   ]
      // })
    ],
  },
];

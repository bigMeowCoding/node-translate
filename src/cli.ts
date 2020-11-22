#!/usr/bin/env node
import * as commander from "commander";
import { translate } from "./main";

const program = new commander.Command();
// name usage是命令行工具的基本配置， -h提示信息面板中的信息配置
// []表示可填可不填 <>希望你填
program
  .version("0.0.1")
  .name("translate")
  .usage("<English>")
  .arguments("<English>")
  .action((arg) => {
    translate(arg);
  });

program.parse(process.argv);

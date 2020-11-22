import * as https from "https";
import md5 = require("md5");
import { appId, appSecret } from "./common/prive-config";
import * as queryString from "querystring";
import { BaiduTranslateResponse } from "./common/interface";

export function translate(str: string) {
  const errorMap: { [key: string]: string } = {
    "52003": "用户未授权",
  };
  const salt = Math.random();
  const sign = md5(appId + str + salt + appSecret);
  let from,
    to = null;
  if (/[a-zA-z]/.test(str[0])) {
    from = "en";
    to = "zh";
  } else {
    from = "zh";
    to = "en";
  }
  const param = {
    q: str,
    from,
    to,
    appid: appId,
    salt,
    sign,
  };
  // path前边必须有反斜杠
  const options = {
    hostname: "fanyi-api.baidu.com",
    path: "/api/trans/vip/translate?" + queryString.stringify(param),
    method: "GET",
  };
  const req = https.request(options, (res) => {
    const data: Buffer[] = [];
    res.on("data", (chunk: Buffer) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const dataString = Buffer.concat(data).toString();
      const dataObject: BaiduTranslateResponse = JSON.parse(dataString);
      if (dataObject.error_code) {
        console.log(errorMap[dataObject.error_code] || dataObject.error_msg);
        process.exit(2); // 退出线程，有错误
      } else {
        console.log(dataObject.trans_result[0].dst);
        process.exit(0); // 退出线程，没错误
      }
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
}

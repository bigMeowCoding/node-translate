export interface BaiduTranslateResponse {
  error_code?: string;
  error_msg?: string;
  from: string;
  to: string;
  trans_result: {
    src: string;
    dst: string;
  }[];
}

import axios from "axios";

export interface ILoginRes {
  expires_in: number;
  scope: string;
  token_type: string;
  access_token: string;
}

export const login = async (): Promise<ILoginRes> => {
  const loginRes = await axios.post<ILoginRes>("http://localhost:4000/auth", {
    api_key:
      "1bb9f755288de82086aab75692f3cd58fa3fb9513de2d4d5ed0a323d288c874b3027e3462bfd884b18438612fddfab1e124b9d607865276cd5055831bac4e6e6",
    api_secret:
      "364b218224bffa86a7a60fc9b0c15927ee8fabf02dc15bfdc1e94a9e572c0838690cf29e2c6ff9b54c8143ba1a01529e4d8bdfa10b3a62a60690e822c0cf673c",
  });

  return loginRes.data;
};

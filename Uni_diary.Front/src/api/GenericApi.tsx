import { client } from "./client";
import { AxiosError, AxiosResponse } from "axios";
import qs from "qs";
import { RESTMethod } from "../shared/types/RESTMethodEnum";
import { store } from "../shared/stores/store";

interface Props {
  uri: string;
  method: RESTMethod;
  item?: object;
  id?: string;
}

type SuccessResponse<V> = {
  code: "success";
  data: V;
};

type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: E;
};

type BaseResponse<V, E> = SuccessResponse<V> | ErrorResponse<E>;

export const HttpRequest = async <V, E = AxiosError>({
  uri,
  method,
  item = {},
  id = "",
}: Props): Promise<BaseResponse<V, E>> => {
  const accessToken = store.getState().user.accessToken;
  const refreshToken = store.getState().user.refreshToken;

  let headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : null,
  };

  if (!accessToken) {
    headers.Authorization = `Bearer ${refreshToken}`;
  }

  let res: AxiosResponse<V>;
  try {
    switch (method) {
      case RESTMethod.Get:
        res = await client.get<V>(uri, { headers });
        break;
      case RESTMethod.Post:
        res = await client.post<V>(uri, qs.stringify(item), { headers });
        break;
      case RESTMethod.Delete:
        res = await client.delete<V>(uri + "/" + id, { headers });
        break;
      case RESTMethod.Put:
        res = await client.put<V>(uri + "/" + id, qs.stringify(item), {
          headers,
        });
        break;
      default:
        throw "Bad request";
    }
    if (res.status >= 400) {
      return {
        code: "error",
        error: new Error(`Request failed with status ${res.status}`) as E,
      };
    }
    return { code: "success", data: res.data };
  } catch (error) {
    return { code: "error", error: error as E };
  }
};

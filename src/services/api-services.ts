import axios from "axios/axios";
import { AxiosResponse } from "axios";
import { HEALTH_CHECK, LOGIN } from "constants/constants";

export default class NetworkManager {
  static HealthCheck(): Promise<AxiosResponse<any>> {
    return axios.get(HEALTH_CHECK);
  }

  static async Login(gameCode: string): Promise<AxiosResponse<any>> {
    return axios.post(`${LOGIN}/${gameCode}`);
  }
}

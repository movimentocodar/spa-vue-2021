import Usuario from "@/model/Usuario";
import { AxiosResponse } from "axios";
import $http from "../model/httpGit";

export default class UserService {
  userservice: UserService;

  constructor() {
    this.userservice = new UserService();
  }

  static async getUser(login: string): Promise<AxiosResponse> {
    return await $http.get<Usuario>(`/users/${login}`);
  }
}

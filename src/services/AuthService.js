import BaseApi from "../api/BaseApi";

class AuthService {
  async login(data) {
    const auth = await BaseApi().post("/authentication", data);
    const { data: response } = auth;
    return response;
  }
}

export default AuthService;

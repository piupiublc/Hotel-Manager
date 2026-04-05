import { fetchClient } from "@/lib/api-client";

export class UserService {
  static async getAllUsers() {
    return fetchClient("/users");
  }

  static async getProfile() {
    return fetchClient("/users/profile");
  }

  static async updateProfile(data: any) {
    return fetchClient("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async deleteUser(id: number) {
    return fetchClient(`/users/${id}`, {
      method: "DELETE",
    });
  }
}

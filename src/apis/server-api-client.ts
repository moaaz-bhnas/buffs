import { ApiError } from "@/interfaces/api-client/Error";
import { IApiClient } from "@/interfaces/api-client/IApiClient";
import { RegisteringDBUser } from "@/interfaces/database/User";
import { AuthResponse } from "@/interfaces/server/AuthResponse";
import ApiClient from "@/utils/api-client/apiClient";
import { Result, err, ok } from "neverthrow";

export class ServerApiClient {
  private readonly apiBaseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
  private readonly apiVersion = 1;
  private serverApiClient: IApiClient = new ApiClient({});

  async signup(
    user: RegisteringDBUser
  ): Promise<Result<AuthResponse, ApiError>> {
    const result = await this.serverApiClient.post<
      RegisteringDBUser,
      AuthResponse
    >(`${this.apiBaseUrl}/v${this.apiVersion}/auth/register`, user);

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    console.log("😋", result.value);
    return ok(result.value);
  }
}

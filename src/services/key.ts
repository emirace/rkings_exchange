import { getBackendErrorMessage } from "../utils/error";
import api from "./api";

export async function getFlutterwavekey() {
  try {
    const response: any = await api.get("/keys/flutterwave");
    if (!response.status) {
      throw new Error(response.message);
    }
    return response.key;
  } catch (error) {
    console.log(
      "Error fetching flutterwave key",
      getBackendErrorMessage(error)
    );
    throw getBackendErrorMessage(error);
  }
}

import { AxiosError, AxiosResponse } from "axios";
export async function handleResponses(response: AxiosResponse) {
  console.log(response);
  if (response.status === 200) return response.data;
  if (response.status === 204) return response;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = response.statusText;
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleErrors(error: AxiosError) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

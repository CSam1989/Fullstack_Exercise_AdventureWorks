import { toast } from "react-toastify";
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
  console.log("API error: " + error);
  console.log(error.response);

  //Bad request
  if (error.response && error.response.status === 400) {
    //Return an array of strings from each validation error field
    throw Object.values(error.response.data.errors);
  }

  //Unauthorized
  if (error.response && error.response.status === 401) {
    //Return an array of string arrays from each validation error field
    throw error.response.data.error;
  }
}

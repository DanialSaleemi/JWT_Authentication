import { RegisterUserInput } from '@/lib/validations/user.schema'
import React from 'react'

interface UserResponse {
    status: string;
    data: {
      user: RegisterUserInput;
    };
  }


async function handleResponse<T>(response: Response) : Promise<T> {
    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        if (isJson && data.errors != null) {
            throw new Error(JSON.stringify(data.errors));
        }
        throw new Error(data.message || response.statusText);
    }

    return data as T;

}

export async function apiGetAuthUser (token? : string): Promise<RegisterUserInput> {
const headers: Record<string, string> = {
    "Content-Type" : "application/json",
};
if (token) {
    headers["Authorization"] = `Bearer ${token}`;
}
const response = await fetch(`/api/users/me`, {
    method : "GET",
    credentials: "include",
    headers,
});
    return handleResponse<UserResponse>(response).then((data) => data.data.user);
};


    const Profile = () => {
    
  return (
    <div>Profile page</div>
   )
}

export default Profile;
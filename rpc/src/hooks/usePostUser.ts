import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../utils/constant";

export const addUser = async (user: object) => {
  try {
    const url = `${baseUrl}/user/create`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const usePostUser = async (user:object) => {
    return useMutation({
        mutationKey:['user/create'],
        mutationFn : () => addUser(user) 
    })
}
import api from "../config/api";

export const handleGET = async (apiURI: string) => {
  try {
    const response = await api.get(apiURI);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function prepareHeaders(headers: Headers) {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
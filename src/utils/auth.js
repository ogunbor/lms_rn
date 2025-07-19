import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../store/actions";
import apiInstance from "./axios";

export const login = async (dispatch, email, password) => {
    try {
        const { data, status } = await apiInstance.post("user/token/", {
            email,
            password,
        });

        setAuthUser(dispatch, data.access, data.refresh);

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response ? error.response.data || "Something went wrong" : "Something went wrong",
        };
    }
};

export const logout = (dispatch) => {
    AsyncStorage.removeItem("access_token");
    AsyncStorage.removeItem("refresh_token");
    dispatch(setUser(null));
};

export const setAuthUser = (dispatch, access_token, refresh_token) => {
    AsyncStorage.setItem("access_token", access_token);
    AsyncStorage.setItem("refresh_token", refresh_token);

    const user = jwtDecode(access_token) ?? null;
    if (user) {
        dispatch(setUser(user));
    }
};
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecStore from "expo-secure-store";
import {host} from "../../constants/host"

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (name: string, email: string, password: string, ent: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
//export const API_URL = 'http://192.168.178.61:9090/api';
export const API_URL = host;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    })

    useEffect(() => {
        const loadToken = async() => {
            const token = await SecStore.getItemAsync(TOKEN_KEY)

            if(token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setAuthState({
                    token: token,
                    authenticated: true
                })
                  
            }
        }

        loadToken();
    }, [])

    const register = async (name: string, email: string, password: string, ent: string) => {
        var res = ''
        try {
            res = await axios.post(`${API_URL}/reg`, { name, email, password, ent })
        } catch (e) {
            return { error: true, msg: e.response.data};
        }


    }

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/auth`, { email, password })

            setAuthState({
                token: res.data.token,
                authenticated: true
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            await SecStore.setItemAsync(TOKEN_KEY, res.data.token)
            return res;

        } catch (e) {
            return { error: true, msg: e.response.data};
        }
    }

    const logout = async () => {
        await SecStore.deleteItemAsync(TOKEN_KEY)
        axios.defaults.headers.common['Authorization'] = ''
        setAuthState({
            token: null,
            authenticated: false
        })
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
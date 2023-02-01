import { createContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [userData, setUserData] = useLocalStorage('userData', {});

        return(
        <AuthContext.Provider value={{userData, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
}
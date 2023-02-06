import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useToken() {
  const { userData } = useContext(AuthContext);
  const token = userData.token;
  return token;
}

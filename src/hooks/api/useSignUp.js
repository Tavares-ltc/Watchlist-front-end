import useAsync from "../useAsync";
import * as authApi from "../../services/authApi";

export default function useSignUp() {
  const {
    loading: signUpLoading,
    error: signUpError,
    act: signUp,
  } = useAsync(authApi.signUp);

  return {
    signUpLoading,
    signUpError,
    signUp,
  };
}

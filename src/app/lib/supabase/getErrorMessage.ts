import {AuthError} from "@supabase/auth-js";

export default function getErrorMessage(error: AuthError) {
  switch(error.code) {
    case undefined:
      return "エラーは発生していません。"
    case "invalid_credentials":
      return "メールアドレスまたはパスワードが間違っています。"
    default:
      return "Unexpected Error: " + error.code
  }
}
import {AuthError} from "@supabase/auth-js";

export default function getAuthErrorMessage(error?: AuthError) {
  if(!error) return null;

  switch (error.code) {
    case undefined:
      return null
    case "invalid_credentials":
      return "メールアドレスまたはパスワードが間違っています。"
    default:
      return "Error: " + error.code
  }
}
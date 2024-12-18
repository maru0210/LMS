import {AuthError} from "@supabase/auth-js";
import {PostgrestError} from "@supabase/supabase-js";

export default function getErrorMessage(error?: AuthError | PostgrestError | null) {
  if (!error) return null;

  switch (error.code) {
    case undefined:
      return null
    case "invalid_credentials":
      return "メールアドレスまたはパスワードが間違っています。"
    case "email_exists":
      return "そのメールアドレスは既に使用されています。"
    default:
      return "Error: " + error.code
  }
}
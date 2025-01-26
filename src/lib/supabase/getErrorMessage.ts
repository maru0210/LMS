import { AuthError } from "@supabase/auth-js";
import { PostgrestError } from "@supabase/supabase-js";

export default function getErrorMessage(error: AuthError | PostgrestError) {
  switch (error.code) {
    case undefined:
      return "Unknown error.";
    case "invalid_credentials":
      return "メールアドレスまたはパスワードが間違っています。";
    case "email_exists":
      return "そのメールアドレスは既に使用されています。";
    default:
      return "Error: " + error.code;
  }
}

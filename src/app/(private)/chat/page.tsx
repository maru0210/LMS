import Navigation from "@/app/components/Navigation";
import {auth} from "@/app/lib/supabase/auth";

export default async function Chat() {
  await auth()

  return (
    <Navigation>
      <p>Chat Room</p>
    </Navigation>
  )
}
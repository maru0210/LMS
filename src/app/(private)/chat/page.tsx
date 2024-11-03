import Navigation from "@/app/components/Navigation";
import {auth} from "@/app/lib/supabase/auth";
import ChatLayout from "@/app/(private)/chat/ChatLayout";
import {getChatData} from "@/app/(private)/chat/action";
import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function Chat() {
  await auth()

  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user
  if(!user) redirect('/error')

  return (
    <Navigation autoPadding={false}>
      <ChatLayout
        myUserId={user.id}
        defaultChatData={await getChatData()}
      />
    </Navigation>
  )
}
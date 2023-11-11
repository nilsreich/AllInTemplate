import { Navbar } from "@/components/Navbar";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import { createClient } from "@/lib/server";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <Navbar />
      <div>
        <div>Test</div>
        {user ? (
          <p>
            {dictionary["server-component"].welcome} {user.email}!
          </p>
        ) : (
          <p>You are not logged in.</p>
        )}{" "}
      </div>
    </main>
  );
}

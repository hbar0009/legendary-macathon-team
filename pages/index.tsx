import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import { Session } from "@supabase/supabase-js";
import Home from "./home";

const Index: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("authData");
      // console.log(_event);
      // console.log(session?.user?.email);
      // console.log(JSON.stringify(session));
      setSession(session);
    });
  }, []);

  const useremail = String(session?.user?.email);

  return <div>{!session ? <Auth /> : <Home username={useremail} />}</div>;
};

export default Index;

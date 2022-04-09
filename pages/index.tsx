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
      setSession(session);
    });
  }, []);

  return <div>{!session ? <Auth /> : <Home />}</div>;
};

export default Index;

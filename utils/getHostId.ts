import { supabase } from "./supabaseClient";
import { definitions } from "../types/supabase";

export default async function getHostId() {
  const { data, error } = await supabase
    .from<definitions["PARTICIPANT"]>("PARTICIPANT")
    .select("part_id")
    .eq("part_email", supabase.auth.session()?.user?.email);

  if (error) throw error;

  return data[0]["part_id"];
}

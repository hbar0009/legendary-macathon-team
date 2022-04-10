import { supabase } from "./supabaseClient";
import { definitions } from "../types/supabase";
import IEvent from "../components/IEvent";

export default async function getEventType(event: IEvent) {
  const { data, error } = await supabase
    .from<definitions["EVENT_TYPE"]>("EVENT_TYPE")
    .select("et_id")
    .eq("et_name", event.category);

  if (error) throw error;

  return data[0]["et_id"];
}

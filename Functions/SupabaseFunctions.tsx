import { supabase } from "../utils/supabaseClient";
import { definitions } from "../types/supabase";
import IEvent, {Category} from '../components/IEvent'

export  async function GetEvents() {
    try {
        // retrieve event type information based on selected category
  
        // get user id of logged in user
        const host_id = await getHostId();

        const { data, error } = await supabase
        .from<definitions["PARTICIPANT_EVENT"]>("PARTICIPANT_EVENT")
        .select("event_id")
        .eq("part_id", host_id);
        if (error) throw error;

        

        return data;
      } catch (error: any) {
        alert(error.error_description || error.message);
      }

}



export  async function GetHostedEvents() {
  try {
      // retrieve event type information based on selected category

      // get user id of logged in user
      const host_id = await getHostId();

      const { data, error } = await supabase
      .from<definitions["EVENT"]>("EVENT")
      .select()
      .eq("event_host", host_id);
      if (error) throw error;

      const eventsArray = await Promise.all( data.map((item) => ConvertToEvent(item)));

      return eventsArray;

    } catch (error: any) {
      alert(error.error_description || error.message);
    }

}

export async function GetUserDetails(){
  try {
  const host_id = await getHostId();
  const { data, error } = await supabase
    .from<definitions["PARTICIPANT"]>("PARTICIPANT")
    .select()
    .eq("part_id", host_id);
    if (error) throw error;
    return data;
  } catch (error: any) {
    alert(error.error_description || error.message);
  }

}



export async function GetEventByID(id:number){

  try {
    // retrieve event type information based on selected category

    // get user id of logged in user


    const { data, error } = await supabase
    .from<definitions["EVENT"]>("EVENT")
    .select()
    .eq("event_id", id);
    console.log(data)
    
    
    if (error) throw error;

    let eventCategory = await getEventNameByID( data[0]["et_id"]);
    var typeString = eventCategory as keyof typeof Category;

    let event : IEvent ={
      title: data[0]["event_name"],
      category: Category[typeString],
      description:data[0]["event_desc"],
      going: 0,
      date: "",
      address: data[0]["event_address"],
      postCode: data[0]["event_postcode"],
      startTime: data[0]["event_start_datetime"],
      endTime: data[0]["event_end_datetime"]
    }

    return event;
  } catch (error: any) {
    alert(error.error_description || error.message);
  }


}
async function getEventNameByID(id:number) {
  const { data, error } = await supabase
    .from<definitions["EVENT_TYPE"]>("EVENT_TYPE")
    .select("et_name")
    .eq("et_id", id);

  if (error) throw error;

  return data[0]["et_name"];
}

export async function ConvertToEvent(item : any){

  var eventCategory = await getEventNameByID(item.et_id)
  var typeString = eventCategory as keyof typeof Category;

  var event : IEvent ={
    title: item.event_name,
    category: Category[typeString],
    description: item.event_desc,
    going: 0,
    date: "",
    address: item.event_address,
    postCode: item.event_postcode,
    startTime:item.event_start_datetime,
    endTime:item.event_end_datetime
  }
  return event;
}



async function getEventTypeByName(name:string) {
    const { data, error } = await supabase
      .from<definitions["EVENT_TYPE"]>("EVENT_TYPE")
      .select("et_id")
      .eq("et_name", name);

    if (error) throw error;

    return data[0]["et_id"];
  }


async function getHostId() {
    const { data, error } = await supabase
      .from<definitions["PARTICIPANT"]>("PARTICIPANT")
      .select("part_id")
      .eq("part_email", supabase.auth.session()?.user?.email);

    if (error) throw error;

    return data[0]["part_id"];
  }

export enum Category {
  Community = "Community Event",
  Meetup = "Local Meetup",
  Volunteering = "Volunteering",
}

interface IEvent {
  id?: number;
  title: string;
  category: Category;
  description: string;
  going: number;
  date: string;
  address: string;
  postCode: string;
  startTime: string;
  endTime: string;
}

export const undefinedEvent: IEvent = {
  title: "",
  category: Category.Community,
  description: "",
  going: 0,
  date: "",
  address: "",
  postCode: "",
  startTime: "",
  endTime: "",
};

export default IEvent;

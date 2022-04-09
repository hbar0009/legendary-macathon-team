export enum Category {
  Community = "Community",
  Meetup = "Meet up",
  Volunteering = "Volunteering",
}

interface IEvent {
  title: string;
  category: Category;
  description: string;
  going: number;
  date: string;
  address: string;
  postCode: string;
}

export const undefinedEvent: IEvent = {
  title: "",
  category: Category.Community,
  description: "",
  going: 0,
  date: "",
  address: "",
  postCode: "",
};

export default IEvent;

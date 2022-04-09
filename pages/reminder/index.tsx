import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Reminder = () => {
  const form = useRef(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_uz46sle",
        "template_hjdx0id",
        e.currentTarget,
        "OsATQ9gtmBSWMXqwj"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.currentTarget.reset();
  };

  return (
    <div>
      <div>
        <p>This page is just for testing emailing feature.</p>
        <p>Input your email in Email of user to receive the message</p>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div>
          <label>Name of user</label>
          <input type="text" name="to_name" />
        </div>
        <div>
          <label>Email of user</label>
          <input type="email" name="to_email" />
        </div>
        <div>
          <label>Message</label>
          <textarea name="message" />
        </div>

        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Reminder;

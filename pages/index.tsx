import type { NextPage } from "next";
import LoginPage from "./login";


const Home: NextPage = () => {

  const isLoggedIn = false;
  if (!isLoggedIn) {
    return <LoginPage />;
  }
  return (
    <div>
      <p>this page is not exists yet, by right you should get to log in page</p>
    </div>
  );

};


export default Home;

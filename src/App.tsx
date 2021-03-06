import React, { FC } from "react";
import AppRouter from "./components/AppRouter";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";

const App: FC = () => {
  const {setUser, setIsAuth} = useActions()


  React.useEffect(() => {
    if(localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username')} as IUser)
      setIsAuth(true)
    }
  }, [])

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
//43.54

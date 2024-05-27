import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import ViewTransaction from "./Components/ViewTransaction/ViewTransaction";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Reports from "./Components/Reports/Reports";
import Exchange from "./Components/Exchange/Exchange";
import { useGlobalContext } from "./context/globalContext";
import Cookies from "js-cookie";
import Authentication from "./Components/Authentication/Authentication";

function App() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    setUsername(Cookies.get("et-auth-name"));
  }, []);

  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <ViewTransaction />;
      case 3:
        return <Reports />;
      case 4:
        return <Income />;
      case 5:
        return <Expenses />;
      case 6:
        return <Exchange />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled className="App">
      {username ? (
        <>
          {orbMemo}
          <MainLayout>
            <Navigation
              active={active}
              setActive={setActive}
              username={username}
            />
            <main>{displayData()}</main>
          </MainLayout>
        </>
      ) : (
        <Authentication />
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
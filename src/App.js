import React from "react";
import { StyleSheetManager } from "styled-components";
import Router from "./Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isActive'}>
        <Router />
      </StyleSheetManager>
    </RecoilRoot>
  );
}

export default App;

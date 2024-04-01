import getServerContext from "@nimpl/getters/get-server-context";
import Nav from "../../components/Nav";
import { UninitializedContext } from "../../components/UninitializedContext";
import SecondComponent from "./SecondComponent";

export default function Page() {
  return (
    <div id="uninitialized-page">
      <Nav />
      <UninitializedContext.Provider value={{ uninitialized: 'first value' }}>
        <UninitializedContext.Consumer>
          {(serverContext) => (
            <p id="context-first-value">
              {serverContext?.uninitialized}
            </p>
          )}
        </UninitializedContext.Consumer>
      </UninitializedContext.Provider>
      <SecondComponent />
    </div>
  );
}

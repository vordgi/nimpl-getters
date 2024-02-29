import Nav from "../../components/Nav";
import { InsideContext } from "../../components/InsideContext";
import SecondComponent from "./SecondComponent";

export default function Page() {
  return (
    <div id="inside-page">
      <Nav />
      <InsideContext.Provider value={{ inside: 'first value' }}>
        <InsideContext.Provider value={{ inside: 'second value' }}>
          <SecondComponent />
        </InsideContext.Provider>
        <InsideContext.Consumer>
          {(serverContext) => (
            <p id="context-first-value">
              {serverContext?.inside}
            </p>
          )}
        </InsideContext.Consumer>
      </InsideContext.Provider>
    </div>
  );
}

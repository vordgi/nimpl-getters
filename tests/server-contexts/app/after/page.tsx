import Nav from "../../components/Nav";
import { AfterContext } from "../../components/AfterContext";
import FirstComponent from "./FirstComponent";

export default function Page() {
  return (
    <div id="after-page">
      <Nav />
      <AfterContext.Provider value={{ after: 'first value' }}>
        <FirstComponent />
      </AfterContext.Provider>
      <AfterContext.Provider value={{ after: 'second value' }}>
        <p id="context-second-value">
          <AfterContext.Consumer>
            {(value) => (
              value?.after
            )}
          </AfterContext.Consumer>
        </p>
      </AfterContext.Provider>
    </div>
  );
}

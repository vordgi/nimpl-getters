import getServerContext from "@nimpl/getters/get-server-context";
import { sleep } from "../../tools/sleep";
import { AfterContext } from "../../components/AfterContext";

const FirstComponent = async () => {
  await sleep(1000);
  const context = getServerContext(AfterContext);

  return (
    <p id="context-first-value">
      {context?.after}
    </p>
  )
}

export default FirstComponent;

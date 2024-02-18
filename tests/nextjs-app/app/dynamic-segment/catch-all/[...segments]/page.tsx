import { getPathname } from 'next-impl-getters/get-pathname';
import { getParams } from 'next-impl-getters/get-params';
import Nav from "../../../../components/Nav";

export default function Page() {
  const pathname = getPathname();
  const params = getParams();

  return (
    <div id="dynamic-segment-catch-all-page">
      <Nav />
      <div>
        <p id='get-pathname'>
          {pathname}
        </p>
        <p id='get-params'>
          {JSON.stringify(params)}
        </p>
      </div>
    </div>
  );
}

import { getPathname } from 'next-impl-getters/get-pathname';
import { getPageConfig } from 'next-impl-getters/get-page-config';
import { getParams } from 'next-impl-getters/get-params';
import { getSearchParams } from 'next-impl-getters/get-search-params';
import BlockWithContext from "../components/BlockWithContext";
import Nav from "../components/Nav";

export default function Page() {
  const pathname = getPathname();
  const pageConfig = getPageConfig();
  const params = getParams();
  const searchParams = getSearchParams();

  return (
    <div id="home-page">
      <Nav />
      <div>
        <p id='get-pathname'>
          {pathname}
        </p>
        <p id='get-page-config'>
          {JSON.stringify(pageConfig)}
        </p>
        <p id='get-params'>
          {JSON.stringify(params)}
        </p>
        <p id='get-search-params'>
          {searchParams.toString()}
        </p>
        <BlockWithContext />
      </div>
    </div>
  );
}
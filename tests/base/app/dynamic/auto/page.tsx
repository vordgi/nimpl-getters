import { getPathname } from "@nimpl/getters/get-pathname";
import { getPageConfig } from "@nimpl/getters/get-page-config";
import { getParams } from "@nimpl/getters/get-params";
import { getSearchParams } from "@nimpl/getters/get-search-params";
import Nav from "../../../components/Nav";

export default function Page() {
    const pathname = getPathname();
    const pageConfig = getPageConfig();
    const params = getParams();
    const searchParams = getSearchParams();

    return (
        <div id="dynamic-auto-page">
            <Nav />
            <div>
                <p id="get-pathname">{pathname}</p>
                <p id="get-page-config">{JSON.stringify(pageConfig)}</p>
                <p id="get-params">{JSON.stringify(params)}</p>
                <p id="get-search-params">{searchParams.toString()}</p>
            </div>
        </div>
    );
}

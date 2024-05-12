import { getPathname } from "@nimpl/getters/get-pathname";
import { getParams } from "@nimpl/getters/get-params";
import Nav from "../../../components/Nav";

export default function Page() {
    const pathname = getPathname();
    const params = getParams();

    return (
        <div id="intercepted-page">
            <Nav />
            <div>
                <p id="intercepted-get-pathname">{pathname}</p>
                <p id="intercepted-get-params">{JSON.stringify(params)}</p>
            </div>
        </div>
    );
}

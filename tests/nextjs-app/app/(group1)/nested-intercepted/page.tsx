import { getPathname } from "@nimpl/getters/get-pathname";
import { getParams } from "@nimpl/getters/get-params";

export default function Page() {
    const pathname = getPathname();
    const params = getParams();

    return (
        <div id="nested-intercepted-page">
            <div>
                <p id="get-pathname">{pathname}</p>
                <p id="get-params">{JSON.stringify(params)}</p>
            </div>
        </div>
    );
}

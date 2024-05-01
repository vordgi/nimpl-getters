import { getPathname } from "@nimpl/getters/get-pathname";
import { getParams } from "@nimpl/getters/get-params";
import { NamespaceServerContext } from "../../../../components/NamespaceServerContext";
import BlockWithContext from "../../../../components/BlockWithContext";
import Nav from "../../../../components/Nav";

export default function Page() {
    const pathname = getPathname();
    const params = getParams();

    return (
        <div id="groups-page">
            <Nav />
            <div>
                <p id="get-pathname">{pathname}</p>
                <p id="get-params">{JSON.stringify(params)}</p>
                <NamespaceServerContext.Provider value={{ namespace: "dynamic-auto" }}>
                    <BlockWithContext />
                </NamespaceServerContext.Provider>
            </div>
        </div>
    );
}

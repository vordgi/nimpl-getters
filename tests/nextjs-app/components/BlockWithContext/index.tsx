import getServerContext from '@nimpl/getters/get-server-context';
import { NamespaceServerContext } from '../NamespaceServerContext';

export default function BlockWithContext() {
    const context = getServerContext(NamespaceServerContext)

    return (
        <div>
            <p id="get-server-context">
                {JSON.stringify(context)}
            </p>
        </div>
    )
}

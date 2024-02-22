'use client';

import { useContext } from "react"
import ClientContext from "../ClientContext"

const ClientBlock = () => {
    const clientContext = useContext(ClientContext);

    return (
        <p>
            Target locale: {clientContext}
        </p>
    )
}

export default ClientBlock;

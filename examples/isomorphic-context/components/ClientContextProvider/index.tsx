'use client';

import ClientContext from "../ClientContext";

type ClientContextProviderProps = {
    locale: string;
    children: React.ReactNode;
}

const ClientContextProvider: React.FC<ClientContextProviderProps> = ({ locale, children }) => (
    <ClientContext.Provider value={locale}>
        {children}
    </ClientContext.Provider>
)

export default ClientContextProvider;

import ServerContext from "../ServerContext";

type ServerContextProviderProps = {
    locale: string;
    children: React.ReactNode;
}

const ServerContextProvider: React.FC<ServerContextProviderProps> = ({ locale, children }) => (
    <ServerContext.Provider value={locale}>
        {children}
    </ServerContext.Provider>
)

export default ServerContextProvider;

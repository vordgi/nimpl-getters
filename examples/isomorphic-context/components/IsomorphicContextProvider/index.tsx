import ClientContextProvider from "../ClientContextProvider";
import ServerContextProvider from "../ServerContextProvider";

type IsomorphicContextProviderProps = {
    locale: string;
    children: React.ReactNode;
}

const IsomorphicContextProvider: React.FC<IsomorphicContextProviderProps> = ({ locale, children }) => (
    <ServerContextProvider locale={locale}>
        <ClientContextProvider locale={locale}>
            {children}
        </ClientContextProvider>
    </ServerContextProvider>
)

export default IsomorphicContextProvider;

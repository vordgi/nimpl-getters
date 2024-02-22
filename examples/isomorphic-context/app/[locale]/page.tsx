import ClientBlock from "../../components/ClientBlock";
import IsomorphicContextProvider from "../../components/IsomorphicContextProvider";
import ServerNav from "../../components/ServerNav";

const LocaleHomePage: React.FC<{ params: { locale: string } }> = ({ params }) => (
  <IsomorphicContextProvider locale={params.locale}>
    <ServerNav />
    <ClientBlock />
  </IsomorphicContextProvider>
)

export default LocaleHomePage;

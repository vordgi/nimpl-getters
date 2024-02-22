import createServerContext from 'next-impl-getters/create-server-context';

const ServerContext = createServerContext<string | null>(null);

export default ServerContext;

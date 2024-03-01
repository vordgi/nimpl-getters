import createServerContext from 'next-impl-getters/create-server-context';

export const UninitializedContext = createServerContext({ uninitialized: 'default value' });

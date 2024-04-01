import getServerContext from '@nimpl/getters/get-server-context';
import ServerContext from '../ServerContext';
import Link from 'next/link';

const ServerNav = () => {
    const serverContext = getServerContext(ServerContext);

    return (
        <nav>
            {['en', 'de', 'fr'].map((locale) => (
                <p key={locale}>
                    {locale === serverContext ? (
                        locale
                    ) : (
                        <Link href={`/${locale}`}>
                            {locale}
                        </Link>
                    )}
                </p>
            ))}
        </nav>
    )
}

export default ServerNav;

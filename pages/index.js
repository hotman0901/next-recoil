import Counter from '@/containers/counter';
import { withTranslation } from '@/i18n';

const IndexPage = () => <Counter />;

IndexPage.getInitialProps = async ({ req }) => {
  const isServer = !!req;
  return { namespacesRequired: ['common', 'i18nSample'], isServer };
};

export default withTranslation('i18nSample')(IndexPage);

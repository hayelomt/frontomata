import { ReactChildren } from '../../utils/types';
import Loading from './Loading';

type LoaderProps = {
  loading: boolean;
} & ReactChildren;

const Loader = ({ children, loading }: LoaderProps) => {
  return <>{loading ? <Loading /> : children}</>;
};

export default Loader;

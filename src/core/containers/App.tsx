import AuthWrapper from '../../features/auth/containers/AuthWrapper';
import AuthContext, {
  useAuthContext,
} from '../../features/auth/service/authContext';
import RouteManager from './RouteManager';

const App = () => {
  const authState = useAuthContext();

  return (
    <>
      <AuthContext.Provider value={{ ...authState }}>
        <AuthWrapper>
          <RouteManager />
        </AuthWrapper>
      </AuthContext.Provider>
    </>
  );
};

export default App;

// import RouteManager from './RouteManager';

// const App = () => {
//   return (
//     <>
//       <RouteManager />
//     </>
//   );
// };

// export default App;

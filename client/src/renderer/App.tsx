import './App.css';
import {
  UserActionHandlers,
  useUserActionHandlers,
} from './hooks/userActionHandlers.hook';
import Navbar from './Components/Navbar/Navbar.component';
import Dashboard from './Components/Dashboard/Dashboard.component';
import Home from './Pages/Home/Home.page';
import AllProviders from './hooks/contextProviders.hook';
import useServerEventHandlers from './hooks/serverEventHandlers.hook';

function AppContents() {
  const userActionHandlers: UserActionHandlers = useUserActionHandlers();
  useServerEventHandlers();
  return (
    <Dashboard
      menu={<Navbar />}
      mainContent={<Home userActionHandlers={userActionHandlers} />}
    />
  );
}

export default function App() {
  return (
    <AllProviders>
      <AppContents />
    </AllProviders>
  );
}

import { useState } from 'react'

import Login from "./pages/login"
import Billing from "./pages/Billing"
import AppShell from "./pages/Appshell";  

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <AppShell /> : <Login onLogin={() => setLoggedIn(true)} />;
}

export default App;

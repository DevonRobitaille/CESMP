import { Routes, Route, Outlet } from 'react-router-dom';

/* Pages */
import {
  Contact,
  Landing,
  Layout,
  Library,
  Missing,
  Publication,
  Login,
  Logout,
  DocumentEdit,
  Folder
} from './pages'

/* Components */
import {
  RequireAuth
} from './components'

/* styles */
import './styles/globals.css'

const ROLES = {
  'User': 3,
  'Editor': 2,
  'Admin': 1
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Pages */}
        <Route path="library" element={<Outlet />}>
          <Route path='publication' element={<Publication />} />

          {/* catch all */}
          <Route path="" element={<Library />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="contact" element={<Contact />} />

        {/* Protected Pages */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="doc" element={<DocumentEdit />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]} />}>
          <Route path="folder" element={<Folder />} />
        </Route>

        <Route path="" element={<Landing />} />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

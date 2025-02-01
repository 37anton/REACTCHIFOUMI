import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Button from "../components/Button";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            <Button>Chi Fou Mi</Button>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link to="/matches">
              <Button>Parties</Button>
            </Link>
            {token ? (
              <Button onClick={logout}>Déconnexion</Button>
            ) : (
              <Link to="/auth">
                <Button>Connexion</Button>
              </Link>
            )}
          </div>

          {/* Menu Burger pour mobile */}
          <div className="md:hidden">
            <Button onClick={() => setOpen(!open)}>☰</Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {open && (
          <div className="md:hidden bg-white shadow-md absolute left-0 right-0 top-16">
            <ul className="flex flex-col items-center space-y-2 py-4">
              <li>
                <Link to="/matches" onClick={() => setOpen(false)}>
                  <Button>Parties</Button>
                </Link>
              </li>
              {token ? (
                <li>
                  <Button onClick={() => { logout(); setOpen(false); }}>
                    Déconnexion
                  </Button>
                </li>
              ) : (
                <li>
                  <Link to="/auth" onClick={() => setOpen(false)}>
                    <Button>Connexion</Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

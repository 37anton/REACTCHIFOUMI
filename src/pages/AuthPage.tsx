import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { notyf } from "../utils/notyf";


const AuthPage = () => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const endpoint = isRegister ? "/register" : "/login";

    try {
      const response = await fetch(`http://localhost:3002${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      login(data.token);
      
      // Affichage d'une notification en cas de succès
      notyf.success(isRegister ? "Compte créé avec succès !" : "Connexion réussie !");

    } catch (err: any) {
      // Affichage de l'erreur avec Notyf
      notyf.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Inscription" : "Connexion"}
        </h2>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 border rounded mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleAuth}
        >
          {isRegister ? "S'inscrire" : "Se connecter"}
        </button>

        <p
          className="mt-4 text-sm text-gray-600 text-center cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Déjà un compte ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { notyf } from "../utils/notyf";

interface Match {
  _id: string;
  user1: { _id: string; username: string };
  user2: { _id: string; username?: string } | null;
}

const GamePage = () => {
  const { token } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetchMatches();
  }, []);

  // 🔄 Charger la liste des parties
  const fetchMatches = async () => {
    try {
        const response = await fetch("http://localhost:3002/matches", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!response.ok) throw new Error("Erreur lors du chargement des parties");

        const data = await response.json();
        setMatches(data);
    } catch (error) {
        notyf.error("Impossible de charger les parties.");
    }
  };

  // 🎮 Créer une nouvelle partie
  const createMatch = async () => {
    setLoading(true);
    try {
        const response = await fetch("http://localhost:3002/matches", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.match || "Erreur lors de la création");
        }

        const newMatch = await response.json();
        setMatches([...matches, newMatch]);
        notyf.success("Partie créée avec succès !");
    } catch (error: any) {
        notyf.error(error.message);
    }
    setLoading(false);
  };

  const joinMatch = async (matchId: string) => {
    try {
      // Vérifier si l'utilisateur a déjà une partie en cours
      const userMatch = matches.find(match => 
        match.user1._id === matchId || (match.user2 && match.user2._id === matchId)
      );
  
      if (userMatch) {
        notyf.error("Vous avez déjà une partie en cours !");
        return;
      }
  
      const response = await fetch(`http://localhost:3002/matches`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.match || "Erreur lors de la connexion à la partie");
      }
  
      // Rafraîchir la liste des parties après avoir rejoint
      fetchMatches();
      notyf.success("Vous avez rejoint la partie !");
    } catch (error: any) {
      notyf.error(error.message);
    }
  };  
    

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Liste des Parties</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 disabled:opacity-50"
        onClick={createMatch}
        disabled={loading}
      >
        {loading ? "Création en cours..." : "Créer une Partie"}
      </button>

      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        {matches.length === 0 ? (
          <p className="text-gray-600 text-center">Aucune partie disponible.</p>
        ) : (
          <ul className="space-y-2">
            {matches.map((match) => (
              <li
                key={match._id}
                className="p-3 border rounded flex justify-between items-center bg-gray-50"
              >
                <span>
                  {match.user1.username} {match.user2 ? `vs ${match.user2.username}` : "(En attente...)"}
                </span>
                {!match.user2 && match.user1._id !== token && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => joinMatch(match._id)}
                  >
                    Rejoindre
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GamePage;

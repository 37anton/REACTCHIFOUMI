import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { notyf } from "../utils/notyf";

interface Match {
  _id: string;
  user1: { _id: string; username: string };
  user2: { _id: string; username?: string } | null;
  turns: { user1?: string; user2?: string; winner?: string }[];
}

const MatchPage = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    fetchMatch();
  }, []);

  const fetchMatch = async () => {
    try {
      const response = await fetch(`http://localhost:3002/matches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Impossible de charger la partie");
      
      const data = await response.json();
      setMatch(data);
    } catch (error) {
      notyf.error("Erreur lors du chargement de la partie.");
    }
  };

  if (!match) return <p>Chargement de la partie...</p>;

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Partie {match._id}</h1>
      <p className="text-xl">
        {match.user1.username} vs {match.user2?.username || "En attente..."}
      </p>
      {/* Ici on pourra ajouter les actions pour jouer */}
    </div>
  );
};

export default MatchPage;

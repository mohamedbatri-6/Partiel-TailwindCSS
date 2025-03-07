import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function RegisterParticipant() {
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
      };

      fetchEvent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, eventId: id }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Participant inscrit avec succès !");
      router.push("/events");
    } else {
      alert("Erreur : " + data.message);
    }
  };

  if (!event) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">inscrire à un événement</h2>
        <p className="mb-4">Événement : {event.title}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

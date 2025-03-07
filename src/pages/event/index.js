import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // L'événement en cours de modification
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxParticipants: "",
  });

  // Récupérer les événements
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/events");
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  // Supprimer un événement
  const deleteEvent = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Événement supprimé avec succès !");
      setEvents(events.filter((event) => event.id !== id)); // Mise à jour de la liste
    } else {
      alert("Erreur lors de la suppression de l'événement");
    }
  };

  // Activer le mode édition
  const editEvent = (event) => {
    setEditingEvent(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      maxParticipants: event.maxParticipants,
    });
  };

  // Soumettre le formulaire de modification
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      maxParticipants: formData.maxParticipants,
    };

    const response = await fetch(
      `http://127.0.0.1:8000/api/events/${editingEvent}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      }
    );

    if (response.ok) {
      alert("Événement modifié avec succès !");
      const updatedEvents = events.map((event) =>
        event.id === editingEvent ? { ...event, ...updatedEvent } : event
      );
      setEvents(updatedEvents);
      setEditingEvent(null); // Quitter le mode édition
    } else {
      alert("Erreur lors de la modification de l'événement");
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Événements sportifs</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border-b pb-4">
              {editingEvent === event.id ? (
                <form onSubmit={handleFormSubmit}>
                  <h3 className="text-xl font-semibold">Modifier un événement</h3>

                  {/* Formulaire de modification */}
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">
                      Titre
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700">
                      Date
                    </label>
                    <input
                      type="datetime-local"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700">
                      Lieu
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="maxParticipants" className="block text-gray-700">
                      Participants Max
                    </label>
                    <input
                      type="number"
                      id="maxParticipants"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                  >
                    Sauvegarder les modifications
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Lieu:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Participants Max:</strong> {event.maxParticipants}
                  </p>

                  {/* Boutons Modifier et Supprimer */}
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => editEvent(event)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                  <a
                    href={`/events/${event.id}/register`}
                    className="text-blue-500 mt-2 block"
                  >
                    inscrire
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

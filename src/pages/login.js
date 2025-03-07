import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Gestion de la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/login', { // L'URL de l'API pour la connexion
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Si la connexion réussit, rediriger l'utilisateur vers le tableau de bord
      router.push('/dashboard');
    } else {
      // Afficher un message d'erreur en cas d'échec
      setErrorMessage(data.message || 'Échec de la connexion');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Connexion</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        
        <form onSubmit={handleLogin}>
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

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

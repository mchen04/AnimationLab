import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [savedAnimations, setSavedAnimations] = useState<string[]>([]);
  const [experimentSettings, setExperimentSettings] = useState<any>({});
  const [newAnimation, setNewAnimation] = useState('');
  const [newSettings, setNewSettings] = useState<any>({});

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}/savedAnimations`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSavedAnimations(Object.values(data));
        } else {
          setSavedAnimations([]);
        }
      });

      const experimentRef = ref(db, `users/${user.uid}/experimentSettings`);
      onValue(experimentRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setExperimentSettings(data);
        } else {
          setExperimentSettings({});
        }
      });
    }
  }, [user]);

  const handleSaveAnimation = () => {
    if (user && newAnimation) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}/savedAnimations`);
      set(userRef, {
        ...savedAnimations,
        [Date.now()]: newAnimation,
      });
      setNewAnimation('');
    }
  };

  const handleUpdateExperimentSettings = () => {
    if (user) {
      const db = getDatabase();
      const experimentRef = ref(db, `users/${user.uid}/experimentSettings`);
      set(experimentRef, newSettings);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-95 rounded-lg shadow-xl border border-gray-700 p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Welcome to your dashboard! Here you can manage your saved animations and experiment settings.</p>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Saved Animations</h3>
        <ul className="list-disc pl-6">
          {savedAnimations.map((animation, index) => (
            <li key={index}>{animation}</li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={newAnimation}
            onChange={(e) => setNewAnimation(e.target.value)}
            placeholder="Enter new animation"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            onClick={handleSaveAnimation}
          >
            Save Animation
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Experiment Settings</h3>
        <pre>{JSON.stringify(experimentSettings, null, 2)}</pre>
        <div className="mt-4">
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={JSON.stringify(newSettings, null, 2)}
            onChange={(e) => setNewSettings(JSON.parse(e.target.value))}
            placeholder="Enter new settings"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={handleUpdateExperimentSettings}
          >
            Update Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

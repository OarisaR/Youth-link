import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserName(userSnap.data().name);
          } else {
            setUserName("User"); // fallback if doc missing
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUserName("User");
        }
      } else {
        setUserName("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Welcome, {userName}!</h2>
    </div>
  );
}

export default Dashboard;

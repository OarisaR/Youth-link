import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Query the users collection where authUID matches the current user's UID
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("authUID", "==", user.uid));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // Get the first (and should be only) matching document
            const userDoc = querySnapshot.docs[0];
            setUserName(userDoc.data().fullName);
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
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";

const ARTESclubComponent = () => {
  const [clubEvents, setClubEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchARTESClubEvents = async () => {
      setLoading(true);
      setError(null); // Reset any previous errors
      try {
        const eventsCollection = collection(firestore, "events");
        const artesClubQuery = query(eventsCollection, where("club", "==", "2"));
        const eventsSnapshot = await getDocs(artesClubQuery);

        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setClubEvents(eventsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ARTES Club events:", error);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchARTESClubEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#fb7979b4] flex justify-center items-center w-full lg:w-auto">
      <div className="py-20 flex flex-col items-center gap-10">
        <h1 className="text-[#1c1c1c] font-serif text-md lg:text-3xl text-center w-auto lg:w-[30em]">
          The ARTES Club in STI College focuses on artistic expression and
          creativity. Through various events and workshops, students can hone
          their skills in visual arts, performance, and more.
        </h1>

        <div className="container mx-auto py-12 px-4 lg:px-0">
          {loading ? (
            <p className="text-center text-lg text-gray-500">Loading events...</p>
          ) : error ? (
            <p className="text-center text-lg text-red-500">{error}</p>
          ) : clubEvents.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No events available for ARTES Club.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {event.eventImage && (
                    <img
                      src={event.eventImage}
                      alt={event.eventName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <h3 className="text-2xl font-semibold text-blue-600">{event.eventName}</h3>

                  <p className="text-gray-600 mt-2">
                    <span className="font-bold">Date:</span> {event.eventDate}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Time:</span> {event.eventTime}
                  </p>

                  <p className="text-gray-600 mt-4">{event.eventDescription}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARTESclubComponent;

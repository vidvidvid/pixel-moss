import { ref, set, push, onValue, off } from "firebase/database";

export const writeSensorData = (database, sensorData) => {
  const sensorDataRef = ref(database, "sensors/");
  const newSensorDataRef = push(sensorDataRef);
  set(newSensorDataRef, sensorData);
};

export const subscribeToSensorData = (database, updateFunc) => {
  const sensorDataRef = ref(database, "sensors/");

  // Subscribe to changes
  const unsubscribe = onValue(sensorDataRef, (snapshot) => {
    const data = snapshot.val();
    // Assuming you want to convert the object of objects into an array
    const dataArray = Object.values(data || {});
    updateFunc(dataArray);
  });

  // Return a function that can be called to unsubscribe
  return () => off(sensorDataRef);
};

export const subscribeToMossMessages = (database, updateFunc) => {
  const messagesRef = ref(database, "mossMessages/");

  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    // Convert the messages object to an array (if it's stored as an object)
    const messagesArray = messages ? Object.values(messages) : [];
    updateFunc(messagesArray);
  });

  return () => off(messagesRef); // Return a function for unsubscribing
};

export const writeMossMessage = (database, message) => {
  const messagesRef = ref(database, "mossMessages/");
  const newMessageRef = push(messagesRef);
  set(newMessageRef, message);
};

const generateUniqueId = () => {
  let timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
  let randomChars = Math.random().toString(36).substring(2, 8); // Generate a random string

  return timestamp + randomChars;
};

export default generateUniqueId;

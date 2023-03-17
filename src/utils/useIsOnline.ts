async function isOnline() {
  try {
    const response = await fetch("https://www.google.com", {
      mode: "no-cors",
      cache: "no-cache",
    });

    return true;
  } catch (error) {
    return false;
  }
}

export default isOnline;

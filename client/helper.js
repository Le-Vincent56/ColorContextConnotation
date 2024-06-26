const handleMessage = (message) => {
  if(document.getElementById('message-text') !== null) {
    document.getElementById('message-text').textContent = message;
    document.getElementById('message-handler').classList.remove('hidden');
  }
};

 /* Sends post requests to the server using fetch. Will look for various
     entries in the response JSON object, and will handle them appropriately.
  */
const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
  
    if(result.redirect) {
      window.location = result.redirect;
    }
  
    // If there's an error, process it
    if(result.error) {
      handleMessage(result.error);
    }

    // If there's a message, process it
    if(result.message) {
      handleMessage(result.message);
    }

    // If there's a handler, then send in the result
    if(handler) {
      handler(result);
    }
};

module.exports = {
    sendPost,
}
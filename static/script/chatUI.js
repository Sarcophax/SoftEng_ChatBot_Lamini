window.onload = function () {
  var sendBtnElem = document.getElementById("sendBtn");
  var chatMessageElem = document.getElementById("chatMessage");
  var chatOutputElem = document.getElementById("chatOutput");
  var loadingContainerElem = document.getElementById("loadingContainer");
  sendBtnElem.addEventListener("click", function () {
    var message = chatMessageElem.value;
    if (message != null && message != "") {
      generateUserChatBubble(message);
      loadingContainerElem.classList.remove("d-none");
      sendChatGPTMessage(message, generateAIChatBubble);
      chatMessageElem.value = "";
    } else {
      alert("Please enter a message.");
    }
  });
  function generateUserChatBubble(message) {
    // Create a new chat bubble wrapper.
    var chatBubbleElem = document.createElement("div");
    chatBubbleElem.classList.add("container");
    chatBubbleElem.classList.add("user-container");
    // Create the message container.
    var chatMessageElem = document.createElement("p");
    chatMessageElem.innerHTML = message;
    chatBubbleElem.appendChild(chatMessageElem);
    chatOutputElem.prepend(chatBubbleElem);
  }
  function generateAIChatBubble(message) {
    // Create a new chat bubble wrapper.
    var chatBubbleElem = document.createElement("div");
    chatBubbleElem.classList.add("container");
    chatBubbleElem.classList.add("darker");
    // Create the message container.
    var chatMessageElem = document.createElement("p");
    chatMessageElem.innerHTML = message;
    chatBubbleElem.appendChild(chatMessageElem);
    chatOutputElem.prepend(chatBubbleElem);
    loadingContainerElem.classList.add("d-none");
  }
  function sendChatGPTMessage(message, onSuccessCallback) {
    const apiUrl = "http://127.0.0.1:8000/lamini";
    var question = message;

    const encodeQuestion = encodeURIComponent(question);

    const urlWithQuery = apiUrl + "?question=" + encodeQuestion;
    return fetch(urlWithQuery, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onSuccessCallback(data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
};

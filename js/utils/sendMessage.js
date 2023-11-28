//
export async function sendMessageFun() {
  const newmailButton = document.getElementById("new_mail");
  const message_area = document.getElementById("message_area");
  const message_area_sent = document.getElementById("message_area_sent");
  message_area_sent.style.display = "none";

  newmailButton.addEventListener("click", function () {
    message_area.style.display = "block";
    message_area_sent.style.display = "none";
  });
}

sendMessageFun();

export async function sendMessage() {
  const sendmessageButton = document.getElementById("sendmessage");
  sendmessageButton.addEventListener("click", function () {
    message_area.style.display = "none";
    message_area_sent.style.display = "block";
  });
}

sendMessage();

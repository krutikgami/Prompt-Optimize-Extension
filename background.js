import geminiApi from "./geminiApi.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GEMINI_OPTIMIZE") {
    geminiApi(message.payload).then((res) => sendResponse(res));
    return true;
  }
});

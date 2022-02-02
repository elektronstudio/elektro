import { ref } from "vue";
import ReconnectingWebsocket, { UrlProvider } from "reconnecting-websocket";
import { randomString, safeJsonParse } from "./string";
import { uniqueCollection } from "./array";
import { config } from "../../config";

export type MessageType = "CHAT" | string;

export type Message = {
  channel: string;
  type: MessageType;
  [key: string]: any;
};

export const ws = new ReconnectingWebsocket(config.wsUrl as UrlProvider);

export const createMessage = (message: Object): string => {
  return JSON.stringify({
    id: randomString(16),
    datetime: new Date().toISOString(),
    // Some clients just check for the value in the
    // message, not whenever the key exits,
    // so we provide empty data just in case
    channel: "",
    type: "",
    value: "",
    ...message,
  } as Message);
};

export const messages = ref<Message[]>([]);

export const initMessages = () => {
  fetch(config.messagesUrl as RequestInfo)
    .then((res) => res.json())
    .then((loadedMessages: Message[]) => {
      // A bit overengineered for a simple ref but
      // useful when using localstorage ref for messages
      messages.value = uniqueCollection(
        [...loadedMessages, ...messages.value],
        "id",
      );
    });

  ws.addEventListener("message", ({ data }) => {
    // Websocket payload can also contain binary data
    // so we try to be on safe side
    const message = safeJsonParse(data);
    // Note that push() to the end of messages.value does
    // not always work / preserve reactivity
    messages.value = [...messages.value, message];
  });
};

import { updateChat } from "../services/chatServices";
import { useChatSettingsPopup } from "../store/chatSettingsPopup";
import { useRoom } from "../store/currentRomm";
import { showErrorMessage } from "./validation";
import { showSuccessMessage } from "./validation";
export const handleUpdate = async (id, oldName, newChat) => {
  const { setPopupToFalse } = useChatSettingsPopup.getState();
  const { setRoomName } = useRoom.getState();
  if (newChat.name < 3) {
    showErrorMessage("new chat name is too short");
    return;
  }
  if (newChat.name > 50) {
    showErrorMessage("new chat name is too long");
    return;
  }
  if (newChat.name.trim() === oldName.trim()) {
    showErrorMessage("new chat name should be different");
    return;
  }
  const res = await updateChat(id, newChat);

  if (res.error) {
    showErrorMessage(res.message);
  } else {
    showSuccessMessage(res.message);
    setPopupToFalse();
    setRoomName(newChat.name);
  }
};

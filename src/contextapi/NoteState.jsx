import { createContext, useContext, useState } from "react";
import { BaseUrls } from "./../BaseUrls";
import { useAuthState } from "./AuthState";
import { errorEmitter, successEmitter } from "../ToastEmitter";

export const noteContext = createContext(null);

function NoteState({ children }) {
  const { token } = useAuthState();
  const [notes, setNotes] = useState([]);

  // CREATE NOTE
  const createNotes = async (note) => {
    try {
      const formData = new FormData();

      formData.append("title", note.title);
      formData.append("description", note.description);
      formData.append("tag", JSON.stringify(note.tag));
      formData.append("isPrivate", note.isPrivate ? "true" : "false");

      if (note.image) {
        formData.append("image", note.image);
      }

      const res = await fetch(`${BaseUrls}/note/create`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        successEmitter(data.message);
        return true;
      } else {
        errorEmitter(data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      errorEmitter("Something went wrong");
      return false;
    }
  };

  // ✅ FIXED HERE
  const getPublicNote = async () => {
    try {
      const res = await fetch(`${BaseUrls}/note/public`);
      const data = await res.json();

      if (data.success) {
        setNotes(data.notes); // ✅ FIXED
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getYourNote = async () => {
    try {
      const res = await fetch(`${BaseUrls}/note/yournotes`, {
        headers: {
          "auth-token": token,
        },
      });

      const data = await res.json();

      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteid) => {
    try {
      const res = await fetch(`${BaseUrls}/note/delete/${noteid}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });

      const data = await res.json();

      if (data.success) {
        setNotes((prev) => prev.filter((n) => n._id !== noteid));
        successEmitter(data.message);
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
// ✅ GET USER NOTES (PROFILE)
const getUserNotes = async (userId) => {
  try {
    const res = await fetch(`${BaseUrls}/note/user/${userId}`);
    const data = await res.json();

    if (data.success) {
      setNotes(data.notes);
      return data.user;
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <noteContext.Provider
      value={{ notes, createNotes, getPublicNote, getYourNote, deleteNote, getUserNotes }}
    >
      {children}
    </noteContext.Provider>
  );
}



export default NoteState;
export const useNoteState = () => useContext(noteContext);
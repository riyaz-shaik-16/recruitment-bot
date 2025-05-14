import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
  },
  reducers: {
    addSession: (state, action) => {
      const newSessions = action.payload;

      newSessions.forEach((session) => {
        const exists = state.sessions.some((s) => s._id === session._id);
        if (!exists) {
          state.sessions.push(session);
        }
      });
    },
    removeSession: (state, action) => {
      state.sessions = state.sessions.filter(
        (session) => session.sessionId !== action.payload.sessionId
      );

      console.log(state.sessions);
    },

    removeAllSessions: (state) => {
      state.sessions = [];
    },
  },
});

export const { addSession, removeSession, removeAllSessions } = sessionSlice.actions;

export default sessionSlice.reducer;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { userSlice } from "./userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { facultySlice } from "./facultySlice";
import { professionSlice } from "./professionSlice";
import { groupSlice } from "./groupSlice";
import { studentSlice } from "./studentSlice";
import { teacherSlice } from "./teacherSlice";
import { adminSlice } from "./adminSlice";
import { courseSlice } from "./courseSlice";
import { groupCourseSlice } from "./groupCourseSlice";
import { teacherCourseSlice } from "./teacherCourseSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userSlice.reducer,
    faculty: facultySlice.reducer,
    profession: professionSlice.reducer,
    group: groupSlice.reducer,
    student: studentSlice.reducer,
    teacher: teacherSlice.reducer,
    admin: adminSlice.reducer,
    course: courseSlice.reducer,
    groupCourse: groupCourseSlice.reducer,
    teacherCourse: teacherCourseSlice.reducer,
  })
);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

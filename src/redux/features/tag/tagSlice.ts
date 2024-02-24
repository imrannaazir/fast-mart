import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TTag = { _id: string; name: string };

type TInitialState = {
  tags: TTag[];
  selectedTags: TTag[];
};

const initialState: TInitialState = {
  tags: [],
  selectedTags: [],
};

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    getAllTags: (state, action) => {
      const { tags, selectedTags } = action.payload;
      const newTags = (tags as TTag[])?.filter(function (array_el) {
        return (
          (selectedTags as TTag[])?.filter(function (anotherOne_el) {
            return anotherOne_el._id == array_el._id;
          }).length == 0
        );
      });

      state.tags = newTags;
    },
    // assign tag
    assignTag: (state, action) => {
      state?.selectedTags.push(action.payload);
      const newTags = state.tags.filter(
        (tag) => tag._id !== action.payload._id
      );
      state.tags = newTags;
    },

    // remove tag
    removeTag: (state, action) => {
      const newSelectedTag = state?.selectedTags.filter(
        (tag) => tag._id !== action.payload._id
      );
      state.selectedTags = newSelectedTag;
      state.tags.push(action.payload);
    },
  },
});

export default tagSlice.reducer;
export const { assignTag, removeTag, getAllTags } = tagSlice.actions;
export const selectSelectedTags = (state: RootState) => state.tags.selectedTags;
export const selectTags = (state: RootState) => state.tags.tags;

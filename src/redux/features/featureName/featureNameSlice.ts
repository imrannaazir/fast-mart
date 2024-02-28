import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TFeatureName = { _id: string; name: string };

type TInitialState = {
  featureNames: TFeatureName[];
  selectedFeatureNames: TFeatureName[];
};

const initialState: TInitialState = {
  featureNames: [],
  selectedFeatureNames: [],
};

const featureNameSlice = createSlice({
  name: "featureName",
  initialState,
  reducers: {
    getAllFeatureNames: (state, action) => {
      const { featureNames, selectedFeatureNames } = action.payload;

      const newFeatureNames = (featureNames as TFeatureName[])?.filter(
        function (featureName) {
          return (
            (selectedFeatureNames as TFeatureName[])?.filter(function (
              selectedFeatureName
            ) {
              return selectedFeatureName._id === featureName._id;
            }).length == 0
          );
        }
      );

      state.featureNames = newFeatureNames;
    },
    // assign FeatureName
    assignFeatureName: (state, action) => {
      state?.selectedFeatureNames.push(action.payload);
      const newFeatureNames = state.featureNames.filter(
        (featureName) => featureName._id !== action.payload._id
      );
      state.featureNames = newFeatureNames;
    },

    // remove FeatureName
    removeFeatureName: (state, action) => {
      console.log(action.payload);

      const newSelectedFeatureName = state?.selectedFeatureNames.filter(
        (featureName) => featureName._id !== action.payload._id
      );
      state.selectedFeatureNames = newSelectedFeatureName;
      state.featureNames.push(action.payload);
    },
  },
});

export default featureNameSlice.reducer;
export const { assignFeatureName, removeFeatureName, getAllFeatureNames } =
  featureNameSlice.actions;
export const selectSelectedFeatureNames = (state: RootState) =>
  state.featureName.selectedFeatureNames;
export const selectFeatureNames = (state: RootState) =>
  state.featureName.featureNames;

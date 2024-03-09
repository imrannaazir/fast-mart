import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TFilter = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type TMeta = {
  page: number | string;
  limit: number | string;
  total: number;
  totalPage: number;
};

type TInitialState = {
  status: TFilter[];
  brands: TFilter[];
  categories: TFilter[];
  operatingSystems: TFilter[];
  powerSources: TFilter[];
  connectivity: TFilter[];
  tags: TFilter[];
  searchTerm: string;
  page: number;
  limit: number;
  meta: TMeta | null;
  date: string | null;
  priceRange: [number, number];
};

const initialState: TInitialState = {
  status: [],
  brands: [],
  categories: [],
  connectivity: [],
  operatingSystems: [],
  powerSources: [],
  tags: [],
  searchTerm: "",
  limit: 5,
  page: 1,
  meta: null,
  date: null,
  priceRange: [0, 0],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // set price range
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },

    setMeta: (state, action) => {
      state.meta = action.payload;
    },
    setDataLimit: (state, action) => {
      state.limit = action.payload;
    },
    goToNextPage: (state) => {
      state.page = state.page + 1;
    },
    goToPrevPage: (state) => {
      state.page = state.page - 1;
    },
    goToNPage: (state, action) => {
      state.page = action.payload;
    },

    // update search term
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // add status
    addStatus: (state, action) => {
      state.status.push(action.payload);
    },

    // remove status
    removeStatus: (state, action) => {
      const filteredStatus = state.status.filter(
        (status) => status.value !== action.payload.value
      );
      state.status = filteredStatus;
    },

    // clear status
    clearStatus: (state) => {
      state.status = [];
    },

    // add brands
    addBrand: (state, action) => {
      state.brands.push(action.payload);
    },

    // remove brands
    removeBrand: (state, action) => {
      const filteredBrands = state.brands.filter(
        (brand) => brand.value !== action.payload.value
      );
      state.brands = filteredBrands;
    },

    // clear brands
    clearBrand: (state) => {
      state.brands = [];
    },
    // add category
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },

    // remove category
    removeCategory: (state, action) => {
      const filteredCategory = state.categories.filter(
        (category) => category.value !== action.payload.value
      );
      state.categories = filteredCategory;
    },

    // clear category
    clearCategories: (state) => {
      state.categories = [];
    },
    // add connectivity
    addConnectivity: (state, action) => {
      state.connectivity.push(action.payload);
    },

    // remove connectivity
    removeConnectivity: (state, action) => {
      const filteredConnectivity = state.connectivity.filter(
        (connectivityEl) => connectivityEl.value !== action.payload.value
      );
      state.connectivity = filteredConnectivity;
    },

    // clear connectivity
    clearConnectivity: (state) => {
      state.connectivity = [];
    },
    // add operating system
    addOperatingSystems: (state, action) => {
      state.operatingSystems.push(action.payload);
    },

    // remove operating system
    removeOperatingSystems: (state, action) => {
      const filteredOperatingSystems = state.operatingSystems.filter(
        (os) => os.value !== action.payload.value
      );
      state.operatingSystems = filteredOperatingSystems;
    },

    // clear operating system
    clearOperatingSystem: (state) => {
      state.operatingSystems = [];
    },
    // add power source
    addPowerSources: (state, action) => {
      state.powerSources.push(action.payload);
    },

    // remove power sources
    removePowerSource: (state, action) => {
      const filteredPowerSources = state.powerSources.filter(
        (powerSource) => powerSource.value !== action.payload.value
      );
      state.powerSources = filteredPowerSources;
    },

    // clear power sources
    clearPowerSources: (state) => {
      state.powerSources = [];
    },
    // add tag
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },

    // remove tags
    removeTag: (state, action) => {
      const filteredTags = state.tags.filter(
        (tag) => tag.value !== action.payload.value
      );
      state.tags = filteredTags;
    },

    // clear tags
    clearTags: (state) => {
      state.tags = [];
    },

    //set filter by date
    setFilterByDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  updateSearchTerm,
  // status
  addStatus,
  removeStatus,
  clearStatus,
  // brand
  addBrand,
  removeBrand,
  clearBrand,
  // category
  addCategory,
  removeCategory,
  clearCategories,
  // connectivity
  addConnectivity,
  removeConnectivity,
  clearConnectivity,
  // operatingSystems
  addOperatingSystems,
  removeOperatingSystems,
  clearOperatingSystem,
  // powerSources
  addPowerSources,
  removePowerSource,
  clearPowerSources,

  //tags
  addTag,
  clearTags,
  removeTag,

  // pagination
  goToNextPage,
  goToPrevPage,
  goToNPage,
  setDataLimit,
  setMeta,
  setFilterByDate,
  setPriceRange,
} = filterSlice.actions;

// selector
export const selectFilteredStatus = (state: RootState) => state.filter.status;
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;
export const selectFilteredBrands = (state: RootState) => state.filter.brands;
export const selectCategory = (state: RootState) => state.filter.categories;
export const selectConnectivity = (state: RootState) =>
  state.filter.connectivity;
export const selectOperatingSystems = (state: RootState) =>
  state.filter.operatingSystems;
export const selectPowerSources = (state: RootState) =>
  state.filter.powerSources;
export const selectTags = (state: RootState) => state.filter.tags;
export const selectPage = (state: RootState) => state.filter.page;
export const selectLimit = (state: RootState) => state.filter.limit;
export const selectMeta = (state: RootState) => state.filter.meta;
export const selectFilterByDate = (state: RootState) => state.filter.date;
export const selectPriceRange = (state: RootState) => state.filter.priceRange;

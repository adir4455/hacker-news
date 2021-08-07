import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true };
  } else if (action.type === SET_STORIES) {
    return {
      ...state,
      isLoading: false,
      hits: action.payload.hits,
      nbPages: action.payload.nbPages,
    };
  } else if (action.type === REMOVE_STORY) {
    return {
      ...state,
      hits: state.hits.filter((story) => {
        return story.objectID !== action.payload;
      }),
    };
  } else if (action.type === HANDLE_SEARCH) {
    return { ...state, query: action.payload, page: 0 };
  } else if (action.type === HANDLE_PAGE) {
    if (action.payload === "inc") {
      let nextPage = state.page + 1;

      if (nextPage > state.nbPages - 1) {
        nextPage = 0;
      }

      return { ...state, page: nextPage };
    }

    if (action.payload === "dec") {
      let nextPage = state.page - 1;

      if (nextPage < 0) {
        nextPage = state.nbPages - 1;
      }

      return { ...state, page: nextPage };
    }
  } else {
    return new Error(`no matching "${action.type} action type`);
  }
};
export default reducer;

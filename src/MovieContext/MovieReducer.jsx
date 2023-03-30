export const initialState = {
  movies: [],
};

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCHDATA":
      return { ...state, movies: payload.movie };
  }
};

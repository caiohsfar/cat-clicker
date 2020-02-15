// Action Types
import api from '../../services/api';
import catNames from '../../assets/catNames';
import catUtils from '../../utils/catUtils';

export const Types = {
  INCREASE_COUNT: 'cats/INCREASE_COUNT',
  GET_SUCCESS: 'cats/GET_SUCCESS',
  GET_FAILED: 'cats/GET_FAILED',
  SET_SELECTED: 'cats/SET_SELECTED',
  LOADING: 'cats/LOADING'
};

// Reducer

const initialState = {
  cats: [],
  loading: false,
  error: false,
  selectedIndex: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOADING:
      return { ...state, loading: true };
    case Types.INCREASE_COUNT:
      return {
        ...state,
        cats: state.cats.map(cat =>
          cat.id === action.payload.catId
            ? { ...cat, clicks: cat.clicks + 1 }
            : cat
        )
      };
    case Types.SET_SELECTED:
      return { ...state, selectedIndex: action.payload.index };
    case Types.GET_SUCCESS:
      return { ...state, cats: action.payload, loading: false };
    case Types.GET_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
}

// Action Creators

export function setSelected(index) {
  return {
    type: Types.SET_SELECTED,
    payload: {
      index
    }
  };
}

export function increaseCount(catId) {
  return {
    type: Types.INCREASE_COUNT,
    payload: {
      catId
    }
  };
}

function getSuccessCallback(cats) {
  return {
    type: Types.GET_SUCCESS,
    payload: cats
  };
}

function getFailedCallback() {
  return {
    type: Types.GET_FAILED
  };
}

function normalizeData(data) {
  return data.map(value => {
    const name = catNames[catUtils.getRandomIndex()];
    const clicks = 0;
    return { ...value, name, clicks };
  });
}

export function getCats(limit = 0) {
  return async function(dispatch) {
    dispatch({ type: Types.LOADING });
    try {
      let { data } = await api.getCats(limit);
      console.log(data);
      data = normalizeData(data);
      dispatch(getSuccessCallback(data));
    } catch {
      dispatch(getFailedCallback());
    }
  };
}

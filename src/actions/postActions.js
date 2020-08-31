import axios from "axios";
import postReducer from "../reducers/postReducer";
import { ADD_POST } from "./types";
import { returnErrors } from "./errorActions";

export const loadPost = (data) => (dispatch, getState) => {
  dispatch({ type: ADD_POST });
  const body = JSON.stringify({});

  axios
    .get(`https://gorest.co.in/public-api/users${data}`, body)
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data.data.slice(1),
      });
    })
    .catch((err) => {
      if (err.data) {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            err.response.data.success
          )
        );
      }
    });
};

import * as requestFromServer from './iconsCrud'
import { iconsSlice } from './iconsSlice'

const { actions } = iconsSlice

export const updateIcon = (params) => (dispatch) =>
// console.log("updateIcon params");

  requestFromServer.fetchIcon(params.category, params.uid).then((response) => {
    const { data } = response.data
    // console.log(data);
    if (data.length > 0) {
      dispatch(actions.saveIcon(data[0]))
    }
  })
// .catch((error) => {
//   // error.clientMessage = "Can't find accounts";
//   // dispatch(actions.catchError({ error, callType: callTypes.list }));
// })
export default updateIcon

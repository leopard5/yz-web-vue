import axios from 'axios'
import { baseUrl } from '../config/env'
//axios.defaults.timeout = 5000;
axios.defaults.baseURL = baseUrl;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
//axios.defaults.onUploadProgress= function (e) {
//console.log(e)
//}
export function fetch(url, params, type) {

  return axios({
    method: type,
    url: url,
    data: params,
    headers: {
      'x-auth-token': 'bec32d1b-9b91-419d-a672-bdb5f1e8b1f3'
    }
  }).then(function (response) {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    console.log(error);

  });


  /*return new Promise((resolve, reject) => {
    if(type == undefined) {
      axios.post(url, params)
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    } else if(type == 'delete') {
      axios.delete(url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    }
  })*/
}
export default {
  //活动列表
  getActivityList(data) {
    let t= fetch('prizeActivity/queryPrizeActivity', data, 'POST');
    return t;
  },
  //根据活动id获取奖品列表
  getPrizeList(data) {
    let t= fetch('prize/queryPrize', data, 'POST');
    return t;
  },
  //添加库存
  addRemainStock(data) {
    let t= fetch('prize/addRemainStock/' + data.id + '/' + data.count, null, 'POST');
    return t;
  },
  //删除活动
  deleteActivity(id) {
    let t= fetch('prizeActivity/deletePrizeActivity/'+ id, null, 'POST');
    return t;
  },
  // 格式化时间
  transformTime(mill, str){
    let refTime;
    if (mill) {
      let mill2 = parseInt(mill);
      let timem = new Date(mill2);
      let y = timem.getFullYear(),
        m = (timem.getMonth() + 1) < 10 ? '0' + (timem.getMonth() + 1) : (timem.getMonth() + 1),
        d = timem.getDate() < 10 ? '0' + timem.getDate() : timem.getDate(),
        h = timem.getHours() < 10 ? '0' + timem.getHours() : timem.getHours(),
        f = timem.getMinutes() < 10 ? '0' + timem.getMinutes() : timem.getMinutes(),
        s = timem.getSeconds() < 10 ? '0' + timem.getSeconds() : timem.getSeconds();

      if (!!str) {
        if (str == "cn") {
          refTime = y + "年" + m + "月" + d + "日 " + h + "时" + f + "分" + s + "秒";
        } else {
          refTime = y + str + m + str + d + " " + h + ":" + f + ":" + s;
        }
      } else {
        refTime = y + '-' + m + '-' + d + " " + h + ":" + f + ":" + s;
      }
    } else {
      refTime = "-"
    }


    return refTime;
  }
}


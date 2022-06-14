import request from '@/utils/request'
import api from '@/api/index'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: api.public.login,
    method: 'post',
    data: parameter
  })
}

export function getCaptcha (parameter) {
  return request({
    url: api.public.getCaptcha,
    method: 'get',
    params: parameter
  })
}

// export function getInfo () {
//   return request({
//     url: api.public.getInfo,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

export function logout () {
  return request({
    url: api.public.logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

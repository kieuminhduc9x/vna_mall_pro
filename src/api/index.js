const api = {
  public: {
    login: '/auth/userLogin',
    logout: '/auth/userLogout',
    forgePassword: '/auth/forge-password',
    register: '/auth/register',
    changePassword: '/auth/admin/changeUserPassword',
    getCaptcha: '/captcha/generate',
    getStoreForUser: '/secUser/admin/getListWarehouse'
  }
}
export default api

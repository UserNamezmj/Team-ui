import onmouse from '../utils/onmouse.js'
// 自定义指令
const directives = {
    onmouse
}
 
export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
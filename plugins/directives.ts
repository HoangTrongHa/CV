/**
 * Global Directives Plugin
 * Register tất cả custom directives globally
 */

import { clickOutside } from '~/directives/clickOutside'
import { focus } from '~/directives/focus'
import { lazyLoad } from '~/directives/lazyLoad'
import { tooltip } from '~/directives/tooltip'
import { copy } from '~/directives/copy'

export default defineNuxtPlugin((nuxtApp) => {
  // Register all directives
  nuxtApp.vueApp.directive('click-outside', clickOutside)
  nuxtApp.vueApp.directive('focus', focus)
  nuxtApp.vueApp.directive('lazy-load', lazyLoad)
  nuxtApp.vueApp.directive('tooltip', tooltip)
  nuxtApp.vueApp.directive('copy', copy)
})

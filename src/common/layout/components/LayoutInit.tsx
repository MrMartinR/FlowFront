import React, { useLayoutEffect } from 'react'
import { KTUtil } from '../../../_metronic/_assets/js/components/util'
import KTLayoutHeader from '../../../_metronic/_assets/js/layout/base/header'
import KTLayoutHeaderMenu from '../../../_metronic/_assets/js/layout/base/header-menu'
import KTLayoutContent from '../../../_metronic/_assets/js/layout/base/content'

function LayoutInit() {
  useLayoutEffect(() => {
    // Initialization
    KTUtil.ready(() => {
      /// /////////////////////////////////////////////////
      // Layout Base Partials(mandatory for core layout)//
      /// /////////////////////////////////////////////////
      // Init Desktop & Mobile Headers
      KTLayoutHeader.init('kt_header')

      // Init Header Menu
      KTLayoutHeaderMenu.init('kt_header_menu', 'kt_header_menu_wrapper')

      // Init Brand Panel For Logo
      // KTLayoutBrand.init('kt_brand');

      // Init Content
      KTLayoutContent.init('kt_content')

      /// ///////////////////////////////////////////
    })
  }, [])
  return <></>
}

export default LayoutInit

import React, { useLayoutEffect } from "react"
import { KTUtil } from "../../_assets/js/components/util"
import KTLayoutHeader from "../../_assets/js/layout/base/header"
import KTLayoutHeaderMenu from "../../_assets/js/layout/base/header-menu"
import KTLayoutContent from "../../_assets/js/layout/base/content"
import KTLayoutSubheader from "../../_assets/js/layout/base/subheader"
import KTLayoutStickyCard from "../../_assets/js/layout/base/sticky-card"
import KTLayoutStretchedCard from "../../_assets/js/layout/base/stretched-card"

function LayoutInit() {
  useLayoutEffect(() => {
    // Initialization
    KTUtil.ready(() => {
      /// /////////////////////////////////////////////////
      // Layout Base Partials(mandatory for core layout)//
      /// /////////////////////////////////////////////////
      // Init Desktop & Mobile Headers
      KTLayoutHeader.init("kt_header", "kt_header_mobile")

      // Init Header Menu
      KTLayoutHeaderMenu.init("kt_header_menu", "kt_header_menu_wrapper")

      // Init Brand Panel For Logo
      // KTLayoutBrand.init('kt_brand');

      // Init Content
      KTLayoutContent.init("kt_content")

      /// ///////////////////////////////////////////
      // Layout Extended Partials(optional to use)//
      /// ///////////////////////////////////////////
      KTLayoutSubheader.init("kt_subheader")

      // Init Sticky Card
      KTLayoutStickyCard.init("kt_page_sticky_card")

      // Init Stretched Card
      KTLayoutStretchedCard.init("kt_page_stretched_card")
    })
  }, [])
  return <></>
}

export default LayoutInit

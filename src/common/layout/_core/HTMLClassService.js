/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import objectPath from 'object-path'
import { toAbsoluteUrl } from '../../../_metronic/_helpers'

export class HtmlClassService {
  // Public properties
  config

  classes

  attributes

  /**
   * Build html element classes from layout config
   * @param layoutConfig
   */
  setConfig(layoutConfig) {
    this.config = this.preInit(layoutConfig)

    // scope list of classes
    this.classes = {
      header: [],
      header_container: [],
      header_menu: [],
      subheader: [],
      subheader_container: [],
      content: [],
      content_container: [],
    }

    this.attributes = {
      header_menu: {},
    }

    // init base layout
    this.initLayout()
    this.initLoader()

    // init header and subheader menu
    this.initHeader()
    this.initSubheader()

    this.initContent()

    // init theme
    this.initTheme()
  }

  preInit(layoutConfig) {
    const updatedConfig = { ...layoutConfig }
    const headerSelfFixedDesktop = objectPath.get(
      updatedConfig,
      'header.self.fixed.desktop',
    )
    const subheaderFixed = objectPath.get(updatedConfig, 'subheader.fixed')
    if (subheaderFixed && headerSelfFixedDesktop) {
      updatedConfig.subheader.style = 'solid'
    } else {
      updatedConfig.subheader.fixed = false
    }
    return updatedConfig
  }

  /**
   * Returns Classes
   *
   * @param path: string
   * @param toString boolean
   */
  getClasses(path, toString) {
    if (path) {
      const classes = objectPath.get(this.classes, path) || ''
      if (toString && Array.isArray(classes)) {
        return classes.join(' ')
      }
      return classes.toString()
    }
    return this.classes
  }

  getAttributes(path) {
    if (path) {
      const attributes = objectPath.get(this.attributes, path) || []
      return attributes
    }
    return []
  }

  getLogo() {
    return toAbsoluteUrl('/media/logos/logo-light.svg')
  }

  /**
   * Init Layout
   */
  initLayout() {
    const selfBodyBackgroundImage = objectPath.get(
      this.config,
      'self.body.background-image',
    )
    if (selfBodyBackgroundImage) {
      document.body.style.backgroundImage = `url("${selfBodyBackgroundImage}'")`
    }

    const _selfBodyClass = objectPath.get(this.config, 'self.body.class')
    if (_selfBodyClass) {
      const bodyClasses = _selfBodyClass.toString().split(' ')
      bodyClasses.forEach((cssClass) => document.body.classList.add(cssClass))
    }
  }

  /**
   * Init Loader
   */
  initLoader() {}

  /**
   * Init Header
   */
  initHeader() {
    // Fixed header
    document.body.classList.add('header-fixed')
    objectPath.push(this.classes, 'header', 'header-fixed')

    // Menu
    const headerMenuSelfDisplay = objectPath.get(
      this.config,
      'header.menu.self.display',
    )
    if (headerMenuSelfDisplay) {
      const headerMenuSelfLayout = objectPath.get(
        this.config,
        'header.menu.self.layout',
      )
      const headerMenuLayoutCssClass = `header-menu-layout-${headerMenuSelfLayout}`
      objectPath.push(this.classes, 'header_menu', headerMenuLayoutCssClass)

      if (objectPath.get(this.config, 'header.menu.self.root-arrow')) {
        objectPath.push(this.classes, 'header_menu', 'header-menu-root-arrow')
      }
    }

    const headerSelfWidth = objectPath.get(this.config, 'header.self.width')
    if (headerSelfWidth === 'fluid') {
      objectPath.push(this.classes, 'header_container', 'container-fluid')
    } else {
      objectPath.push(this.classes, 'header_container', 'container')
    }
  }

  /**
   * Init Subheader
   */
  initSubheader() {
    const subheaderDisplay = objectPath.get(this.config, 'subheader.display')
    if (subheaderDisplay) {
      document.body.classList.add('subheader-enabled')
    } else {
      return
    }

    // Fixed content head
    const subheaderFixed = objectPath.get(this.config, 'subheader.fixed')
    const headerSelfFixedDesktop = objectPath.get(
      this.config,
      'header.self.fixed.desktop',
    )
    if (subheaderFixed && headerSelfFixedDesktop) {
      document.body.classList.add('subheader-fixed')
      // Page::setOption('layout', 'subheader/style', 'solid'); => See preInit()
    } else {
      // Page::setOption('layout', 'subheader/fixed', false); => See preInit()
    }

    const subheaderStyle = objectPath.get(this.config, 'subheader.style')
    if (subheaderStyle) {
      const subheaderClass = `subheader-${subheaderStyle}`
      objectPath.push(this.classes, 'subheader', subheaderClass)
    }

    const subheaderWidth = objectPath.get(this.config, 'subheader.width')
    if (subheaderWidth === 'fluid') {
      objectPath.push(this.classes, 'subheader_container', 'container-fluid')
    } else {
      objectPath.push(this.classes, 'subheader_container', 'container')
    }

    if (objectPath.get(this.config, 'subheader.clear')) {
      objectPath.push(this.classes, 'subheader', 'mb-0')
    }
  }

  /**
   * Init Content
   */
  initContent() {
    if (objectPath.get(this.config, 'content.fit-top')) {
      objectPath.push(this.classes, 'content', 'pt-0')
    }

    if (objectPath.get(this.config, 'content.fit-bottom')) {
      objectPath.push(this.classes, 'content', 'pb-0')
    }

    if (objectPath.get(this.config, 'content.width') === 'fluid') {
      objectPath.push(this.classes, 'content_container', 'container-fluid')
    } else {
      objectPath.push(this.classes, 'content_container', 'container')
    }
  }

  /** Init Theme */
  initTheme() {
    const asideSelfDisplay = objectPath.get(this.config, 'aside.self.display')
    if (!asideSelfDisplay) {
      const headerSelfTheme = objectPath.get(this.config, 'header.self.theme')
      document.body.classList.add(`brand-${headerSelfTheme}`)
    } else {
      const brandSelfTheme = objectPath.get(this.config, 'brand.self.theme')
      document.body.classList.add(`brand-${brandSelfTheme}`)
    }
  }
}

export default HtmlClassService

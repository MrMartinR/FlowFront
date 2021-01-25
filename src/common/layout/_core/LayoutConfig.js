import { toAbsoluteUrl } from '../../../_metronic/_helpers'

function getInitLayoutConfig() {
  return {
    // == Page Splash Screen loading
    loader: {
      enabled: true,
      type: '', // default|spinner-message|spinner-logo
      logo: toAbsoluteUrl('/media/logos/flow-logo.svg'),
      message: 'Please wait...'
    }
  }
}

export default getInitLayoutConfig

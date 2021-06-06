import { toAbsoluteUrl } from '../../../app/utils'

export const getInitLayoutConfig = () => {
  return {
    // == Page Splash Screen loading
    loader: {
      enabled: true,
      type: '', // default|spinner-message|spinner-logo
      logo: toAbsoluteUrl('/media/logos/flow-logo.svg'),
      message: 'Please wait...',
    },
  }
}
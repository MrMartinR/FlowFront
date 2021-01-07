// [REV] errors renaming to tsx
import React from 'react'
import { IntlProvider } from 'react-intl'
import { useLang } from './Metronici18n'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'

import enMessages from './messages/en'

const allMessages = {
  en: enMessages,
}

function I18nProvider({ children }) {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default I18nProvider

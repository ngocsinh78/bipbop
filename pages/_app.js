import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/app.scss'

import App from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { initMatomo } from '../lib/matomo'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export default class MyApp extends App {
  componentDidMount () {
    initMatomo()
  }

  render () {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}

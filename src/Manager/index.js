import React from 'react'
import addons from '@storybook/addons'
import PanelContainer from './components/PanelContainer'
import { ADDON_ID, PANEL_ID } from '../shared'

export default () => {
  addons.register(ADDON_ID, api => {
    const channel = addons.getChannel()

    addons.addPanel(PANEL_ID, {
      title: 'Themes',
      render() {
        return <PanelContainer api={api} channel={channel} />
      }
    })
  })
}

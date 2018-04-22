import React from 'react'
import addons from '@storybook/addons'
import ThemeSwitcherContainer from './components/ThemeSwitcherContainer'
import { SET_THEMES_EVENT_ID } from '../shared'

export default function withThemeSwitcher(options) {
  return (storyFn, context) => {
    const channel = addons.getChannel()

    if (options) {
      channel.emit(SET_THEMES_EVENT_ID, options.themes)
    }

    return reactHandler(channel)(storyFn)(context)
  }
}

export const reactHandler = channel => getStory => context => {
  const initialContent = getStory(context)
  const props = { context, storyFn: getStory, channel, initialContent }
  return <ThemeSwitcherContainer {...props} />
}

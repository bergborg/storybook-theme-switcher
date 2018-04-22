import React from 'react'
import { ThemeProvider } from 'styled-components'
import { SET_THEMES_EVENT_ID, THEME_CHANGE_EVENT_ID } from '../../shared'

class ThemeSwitcherContainer extends React.Component {
  constructor(props) {
    super(props)

    if (props.themes) {
      props.channel.emit(SET_THEMES_EVENT_ID, props.themes)
    }

    this.setTheme = this.setTheme.bind(this)

    this.state = {
      storyContent: this.props.initialContent,
      theme: null
    }

    props.channel.on(THEME_CHANGE_EVENT_ID, this.setTheme)
  }

  componentWillUnmount() {
    this.props.channel.removeListener(THEME_CHANGE_EVENT_ID, this.setTheme)
  }

  setTheme(theme) {
    this.setState({ theme })
  }

  render() {
    if (!this.state.theme) {
      return this.state.storyContent
    }

    return (
      <ThemeProvider theme={this.state.theme}>
        {this.state.storyContent}
      </ThemeProvider>
    )
  }
}

export default ThemeSwitcherContainer

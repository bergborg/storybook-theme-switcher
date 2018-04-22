import React from 'react'
import Panel from './Panel'
import { SET_THEMES_EVENT_ID, THEME_CHANGE_EVENT_ID } from '../../shared'

const defaultThemes = {
  'No theme': null
}

class PanelContainer extends React.Component {
  constructor(props) {
    super(props)

    this.setThemes = this.setThemes.bind(this)
    this.setSelectedTheme = this.setSelectedTheme.bind(this)
    this.getSelectedTheme = this.getSelectedTheme.bind(this)
    this.onSelectTheme = this.onSelectTheme.bind(this)

    this.state = {
      themes: defaultThemes,
      selectedTheme: Object.keys(defaultThemes)[0]
    }

    props.channel.on(SET_THEMES_EVENT_ID, this.setThemes)

    this.unsubscribeFromOnStory = props.api.onStory(() => {
      props.channel.emit(THEME_CHANGE_EVENT_ID, this.getSelectedTheme())
    })
  }

  componentWillUnmount() {
    this.props.channel.removeListener(SET_THEMES_EVENT_ID, this.setThemes)

    if (this.unsubscribeFromOnStory) {
      this.unsubscribeFromOnStory()
    }
  }

  setThemes(themes) {
    this.setState({
      themes: {
        ...defaultThemes,
        ...themes
      }
    })
  }

  getSelectedThemeName() {
    return this.state.selectedTheme
  }

  setSelectedTheme(themeName) {
    this.setState({ selectedTheme: themeName })
    this.props.channel.emit(THEME_CHANGE_EVENT_ID, this.state.themes[themeName])
  }

  getSelectedTheme() {
    return this.state.themes[this.getSelectedThemeName()]
  }

  onSelectTheme(e) {
    this.setSelectedTheme(e.target.value)
  }

  render() {
    return (
      <Panel
        themes={this.state.themes}
        onChange={this.onSelectTheme}
        selectedTheme={this.getSelectedThemeName()}
      />
    )
  }
}

export default PanelContainer

import React from 'react'
import { configure as configureEnzyme, shallow } from 'enzyme'
import React16Adapter from 'enzyme-adapter-react-16'
import { ThemeProvider } from 'styled-components'
import ThemeSwitcherContainer from '../ThemeSwitcherContainer'
import { SET_THEMES_EVENT_ID, THEME_CHANGE_EVENT_ID } from '../../../shared'

configureEnzyme({ adapter: new React16Adapter() })

describe('ThemeSwitcherContainer', () => {
  const storyContent = 'Test'

  const suppliedThemes = {
    Theme1: {},
    Theme2: {}
  }

  const props = {
    channel: {
      on: jest.fn(),
      emit: jest.fn(),
      removeListener: jest.fn()
    },
    api: {
      onStory: jest.fn()
    },
    initialContent: storyContent,
    themes: suppliedThemes
  }

  it('renders without crashing', () => {
    shallow(<ThemeSwitcherContainer {...props} />)
  })

  let subject

  beforeEach(() => {
    subject = shallow(<ThemeSwitcherContainer {...props} />)
  })

  describe('construct', () => {
    it('creates the initial state', () => {
      expect(subject.instance().state).toEqual({
        storyContent: storyContent,
        theme: null
      })
    })

    it('emits `SET_THEMES_EVENT_ID` with the supplied themes', () => {
      expect(props.channel.emit).toHaveBeenCalledWith(
        SET_THEMES_EVENT_ID,
        suppliedThemes
      )
    })

    it('listens on `THEME_CHANGE_EVENT_ID` channel', () => {
      expect(props.channel.on).toHaveBeenCalledWith(
        THEME_CHANGE_EVENT_ID,
        subject.instance().setTheme
      )
    })
  })

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      subject.instance().componentWillUnmount()
    })

    it('removes `SET_THEMES_EVENT_ID` channel listener', () => {
      expect(props.channel.removeListener).toHaveBeenCalledWith(
        THEME_CHANGE_EVENT_ID,
        subject.instance().setTheme
      )
    })
  })

  describe('setTheme', () => {
    const themeName = 'theme1'

    beforeEach(() => {
      subject.instance().setState = jest.fn()
      subject.instance().setTheme(themeName)
    })

    it('stores the key of the selected theme in the state', () => {
      expect(subject.instance().setState).toHaveBeenCalledWith({
        theme: themeName
      })
    })
  })

  describe('render', () => {
    it('renders the storyContent when no theme is set', () => {
      subject.setState({ theme: null })

      expect(subject.equals(storyContent)).toBe(true)
    })

    it('renders the storyContent wrapped in a ThemeProvider when a theme is set', () => {
      subject.setState({ theme: {} })

      expect(subject.is(ThemeProvider)).toBe(true)
      expect(subject.children()).toHaveLength(1)
      expect(
        subject
          .children()
          .first()
          .equals(storyContent)
      ).toBe(true)
    })
  })
})

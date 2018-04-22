import React from 'react'
import { shallow, configure as configureEnzyme } from 'enzyme'
import React16Adapter from 'enzyme-adapter-react-16'
import PanelContainer from '../PanelContainer'
import Panel from '../Panel'
import { SET_THEMES_EVENT_ID, THEME_CHANGE_EVENT_ID } from '../../../shared'

configureEnzyme({ adapter: new React16Adapter() })

describe('PanelContainer', () => {
  const props = {
    channel: {
      on: jest.fn(),
      emit: jest.fn(),
      removeListener: jest.fn()
    },
    api: {
      onStory: jest.fn()
    }
  }

  const defaultThemes = {
    'No theme': null
  }

  it('renders without crashing', () => {
    shallow(<PanelContainer {...props} />)
  })

  let subject

  beforeEach(() => {
    subject = shallow(<PanelContainer {...props} />)
  })

  describe('construct', () => {
    it('creates the initial state', () => {
      expect(subject.instance().state).toEqual({
        themes: defaultThemes,
        selectedTheme: 'No theme'
      })
    })

    it('listens on `SET_THEMES_EVENT_ID` channel', () => {
      expect(props.channel.on).toHaveBeenCalledWith(
        SET_THEMES_EVENT_ID,
        subject.instance().setThemes
      )
    })
  })

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      subject.instance().componentWillUnmount()
    })

    it('removes `SET_THEMES_EVENT_ID` channel listener', () => {
      expect(props.channel.removeListener).toHaveBeenCalledWith(
        SET_THEMES_EVENT_ID,
        subject.instance().setThemes
      )
    })
  })

  describe('setThemes', () => {
    const themes = {
      theme1: {},
      theme2: {}
    }

    beforeEach(() => {
      subject.instance().setState = jest.fn()
      subject.instance().setThemes(themes)
    })

    it('stores the themes together with the default themes in the state', () => {
      expect(subject.instance().setState).toHaveBeenCalledWith({
        themes: {
          ...defaultThemes,
          ...themes
        }
      })
    })
  })

  describe('getSelectedThemeName', () => {
    const selectedThemeName = 'Test'

    beforeEach(() => {
      subject.instance().state = {
        selectedTheme: selectedThemeName
      }
    })

    it('returns the name of the selected theme from the state', () => {
      expect(subject.instance().getSelectedThemeName()).toEqual(
        selectedThemeName
      )
    })
  })

  describe('getSelectedTheme', () => {
    const selectedThemeName = 'Theme 1'
    const themes = {
      'Theme 1': 'Themecontent 1',
      'Theme 2': 'Themecontent 2'
    }

    beforeEach(() => {
      subject.instance().state = {
        themes: themes,
        selectedTheme: selectedThemeName
      }
    })

    it('returns the selected theme from the state', () => {
      expect(subject.instance().getSelectedTheme()).toEqual('Themecontent 1')
    })
  })

  describe('onSelectTheme', () => {
    const selectedThemeName = 'Test'

    beforeEach(() => {
      subject.instance().setSelectedTheme = jest.fn()
      subject.instance().onSelectTheme({ target: { value: selectedThemeName } })
    })

    it('calls setSelectTheme with the value of the select input', () => {
      expect(subject.instance().setSelectedTheme).toHaveBeenCalledWith(
        selectedThemeName
      )
    })
  })

  describe('setSelectedTheme', () => {
    const availableThemes = {
      theme1: 'Test'
    }

    const selectedThemeName = 'theme1'

    beforeEach(() => {
      subject.instance().setState = jest.fn()
      subject.instance().state = {
        themes: availableThemes
      }
      subject.instance().setSelectedTheme(selectedThemeName)
    })

    it('stores the key of the selected theme in the state', () => {
      expect(subject.instance().setState).toHaveBeenCalledWith({
        selectedTheme: selectedThemeName
      })
    })

    it('emits `THEME_CHANGE_EVENT_ID` with the selected theme', () => {
      expect(props.channel.emit).toHaveBeenCalledWith(
        THEME_CHANGE_EVENT_ID,
        availableThemes[selectedThemeName]
      )
    })
  })

  describe('render', () => {
    it('renders a Panel', () => {
      expect(subject.is(Panel)).toBe(true)
    })
  })
})

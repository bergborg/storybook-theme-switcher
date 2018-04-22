import React from 'react'
import { shallow, configure as configureEnzyme } from 'enzyme'
import React16Adapter from 'enzyme-adapter-react-16'
import Panel from '../Panel'

configureEnzyme({ adapter: new React16Adapter() })

describe('Panel', () => {
  const props = {
    onChange: jest.fn(),
    themes: {
      'Theme #1': {},
      'Theme #2': {}
    },
    selectedTheme: 'Theme #1'
  }

  const themeNames = Object.keys(props.themes)

  it('renders without crashing', () => {
    shallow(<Panel {...props} />)
  })

  let subject

  beforeEach(() => {
    subject = shallow(<Panel {...props} />)
  })

  describe('render', () => {
    it('renders passed theme names as option tags', () => {
      expect(subject.find('select').children()).toHaveLength(2)
      expect(
        subject
          .find('select')
          .contains(<option key={themeNames[0]}>{themeNames[0]}</option>)
      ).toBe(true)
      expect(
        subject
          .find('select')
          .contains(<option key={themeNames[1]}>{themeNames[1]}</option>)
      ).toBe(true)
    })
  })
})

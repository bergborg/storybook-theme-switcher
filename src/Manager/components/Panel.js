import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  themesPanel: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto'
  }
}

const Panel = props => {
  return (
    <div style={styles.themesPanel}>
      <select onChange={props.onChange} value={props.selectedTheme}>
        {Object.keys(props.themes).map(themeName => (
          <option key={themeName}>{themeName}</option>
        ))}
      </select>
    </div>
  )
}

Panel.defaultValues = {
  selectedTheme: ''
}

Panel.propTypes = {
  onChange: PropTypes.func,
  selectedTheme: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  themes: PropTypes.object
}

export { Panel as default }

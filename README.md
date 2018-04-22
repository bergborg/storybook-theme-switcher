# Storybook Theme Switcher
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

With Storybook Theme Switcher you can easily switch between themes used by Styled Components. If a theme is selected the story's content is wrapped in a Styled Components' ThemeProvider using the selected theme.


## Installation
	npm install --save-dev storybook-theme-switcher
or

	yarn add -D storybook-theme-switcher

## Usage
Register the addon in addons.js:

	import { registerThemeSwitcher } from  'storybook-theme-switcher'
	registerThemeSwitcher()

Configure your themes in config.js or in single stories:

	import { withThemeSwitcher } from  'storybook-theme-switcher'
	import mainTheme from ...
	import darkTheme from ...

	addDecorator(withThemeSwitcher({
		themes: {
			'Main Theme':  mainTheme,
			'Dark Theme':  darkTheme
		}
	}))
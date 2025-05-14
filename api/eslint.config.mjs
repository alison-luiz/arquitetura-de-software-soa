import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
	{
		ignores: ['node_modules', 'dist', 'coverage', '.husky', '*.php']
	},
	{ languageOptions: { globals: globals.node } },
	...tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		rules: {
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'off'
		}
	}
]

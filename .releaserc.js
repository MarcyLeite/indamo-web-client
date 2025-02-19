const template =
	'[{{commit.short}}](https://gitlab.amz1b.br/{{owner}}/{{repo}}/commit/{{commit.short}}) {{subject}}'
export default {
	plugins: [
		[
			'semantic-release-gitmoji',
			{
				releaseRules: {
					major: [':boom:'],
					minor: [':sparkles:'],
					patch: [':bug:', ':ambulance:', ':lock:', ':lipstick:'],
				},
				releaseNotes: {
					partials: {
						commitTemplate: template,
					},
				},
			},
		],
		//['@semantic-release/npm', { npmPublish: false, tarballDir: 'dist' }],
	],
}

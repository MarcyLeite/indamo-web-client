import semanticRelease from 'semantic-release'
import { fileURLToPath } from 'url'
import { writeFileSync, mkdirSync, readFileSync } from 'fs'

const { version } = JSON.parse(readFileSync('package.json'))

const getReleaseData = async () => {
	const meta = await semanticRelease({ dryRun: true })

	if (!meta) return
	return meta.nextRelease
}

const writeReleaseFile = async () => {
	const data = await getReleaseData()
	mkdirSync('.temp', { recursive: true })

	writeFileSync('.temp/version', data?.version ?? version)
	writeFileSync('.temp/notes.md', data?.notes ?? '')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	writeReleaseFile()
}

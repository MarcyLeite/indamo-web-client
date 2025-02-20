import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import YaraCore from './components/YaraCore'
import './main.scss'
import './assets/style/index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<YaraCore></YaraCore>
	</StrictMode>
)

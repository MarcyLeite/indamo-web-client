import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Indamo from './components/Indamo'
import './main.scss'
import './assets/style/index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Indamo></Indamo>
	</StrictMode>
)

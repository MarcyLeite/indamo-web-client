import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IndamoCore from './components/IndamoCore'
import './main.scss'
import './assets/style/index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<IndamoCore></IndamoCore>
	</StrictMode>
)

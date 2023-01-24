
import React from 'react'
import { createRoot } from 'react-dom/client'

import Application from 'container/application'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<Application />)

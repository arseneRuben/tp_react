
import React from 'react'
import { createRoot } from 'react-dom/client'

import FormContainer from 'container/form-container'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<FormContainer />)

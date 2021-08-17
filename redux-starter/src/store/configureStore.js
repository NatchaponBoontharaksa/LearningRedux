// import { createStore } from 'redux'
// import { devToolsEnhancer } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger'
import func from './middleware/func'
import toast from './middleware/toast'
import api from './middleware/api'

export default function () {
    return configureStore({ 
        reducer,
        middleware: [logger({description: 'console'}), func, toast, api]
     });
}
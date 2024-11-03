import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/material'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ConfirmProvider } from 'material-ui-confirm'

// Config Redux store
import { Provider } from 'react-redux'
import { store } from '~/redux/store.js'

// Config react-router-dom with Browser-router
import { BrowserRouter } from 'react-router-dom'

// Config redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Inject store to authorizeAxios
import { injectStore } from '~/utils/authorizeAxios'
injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider
            defaultOptions={{
              cancellationButtonProps: { color: 'error', variant: 'outlined' },
              allowClose: false,
              buttonOrder: ['confirm', 'cancel'],
              dialogProps: { maxWidth: 'xs' },
              confirmationText: 'Confirm',
              cancellationText: 'Cancel'
            }}
          >
            <GlobalStyles
              styles={{
                a: {
                  textDecoration: 'none'
                }
              }}
            />
            <CssBaseline />
            <App />
            <ToastContainer theme="colored" />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ConfirmProvider } from 'material-ui-confirm'

// Config Redux store
import { Provider } from 'react-redux'
import { store } from '~/redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          cancellationButtonProps: { color: 'error', variant: 'outlined' },
          allowClose: false,
          buttonOrder: ['confirm', 'cancel'],
          dialogProps: { maxWidth: 'xs' }
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer theme="colored" />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
)

import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import LoadingSpinner from '~/components/Loading/LoadingSpinner'

const AccountVerification = () => {
  const [searchParams] = useSearchParams()
  //   const email = searchParams.get('email')
  //   const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])
  //   console.log(email, token)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to={'/404'} />
  }

  if (!verified) return <LoadingSpinner caption={'Verifying your account'} />
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification

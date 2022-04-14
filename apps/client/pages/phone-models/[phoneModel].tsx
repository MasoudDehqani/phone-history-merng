import { useRouter } from 'next/router'
import usePhoneReducer from '~components/Hooks/usePhoneReducer'
import { PhoneType } from '~utils/types'
import Phones from '../../src/components/Phones'
import { handlePhonesServerSideRequests } from '../../src/utils/handleServerSideRequest'

export default function Phone({ phones } : { phones: PhoneType[] }) {

  const router = useRouter()
  
  return (
    <Phones data={phones} />
  )
}

export const getServerSideProps = handlePhonesServerSideRequests()
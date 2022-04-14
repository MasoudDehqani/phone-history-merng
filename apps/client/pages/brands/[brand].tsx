import Phones from '../../src/components/Phones'
import { PhoneType } from '~utils/types'
import { handlePhonesServerSideRequests } from '../../src/utils/handleServerSideRequest'

export default function Brand({ phones } : { phones: PhoneType[] }) {
  return (
    <div>
      <Phones data={phones} />
    </div>
  )
}

export const getServerSideProps = handlePhonesServerSideRequests()
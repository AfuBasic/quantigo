import { useParams } from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader'
import { PlaceholderPanel } from '../../components/PlaceholderPanel'

export function PoolDetailsPage() {
  const { poolId } = useParams()

  return (
    <>
      <PageHeader title="Pool Details" eyebrow={`Pool ${poolId ?? ''}`} />
      <PlaceholderPanel>Pool detail placeholder.</PlaceholderPanel>
    </>
  )
}

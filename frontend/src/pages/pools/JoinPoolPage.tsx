import { useParams } from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader'
import { PlaceholderPanel } from '../../components/PlaceholderPanel'

export function JoinPoolPage() {
  const { poolId } = useParams()

  return (
    <>
      <PageHeader title="Join Pool" eyebrow={`Pool ${poolId ?? ''}`} />
      <PlaceholderPanel>Join pool placeholder.</PlaceholderPanel>
    </>
  )
}

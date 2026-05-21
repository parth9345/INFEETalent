import { SectionHeader } from './SectionHeader'

type SectionHeadingProps = Parameters<typeof SectionHeader>[0]

export function SectionHeading(props: SectionHeadingProps) {
  return <SectionHeader {...props} />
}

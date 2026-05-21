import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { RichText } from '@/components/ui/RichText'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { figmaAssets } from '@/lib/assets'
import { getTeamMembers } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { cn, relationItems } from '@/lib/utils'
import type { PageBlock, TeamMemberItem } from '@/types/content'

type TeamBlock = Extract<PageBlock, { blockType: 'team' }>

export async function TeamSection({ block }: { block: TeamBlock }) {
  const selectedMembers = relationItems<TeamMemberItem>(block.members)
  const items = selectedMembers.length ? selectedMembers : await getTeamMembers(12)
  const editorial = block.layout === 'editorial'

  return (
    <section id={sectionId(block.settings)} className={sectionClasses(block.settings, { defaultBackground: 'cream' })}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} title={block.heading} description={block.description} className="mb-16 max-w-4xl" />
        <div className={cn('grid gap-8', editorial ? 'lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
          {items.map((member) => (
            <article key={member.slug || member.name} className={cn('border border-neutral-border bg-neutral-white', editorial && 'grid sm:grid-cols-[220px_1fr]')}>
              <div className={cn('relative overflow-hidden', editorial ? 'min-h-[260px]' : 'h-[320px]')}>
                <OptimizedImage
                  media={member.photo}
                  fallbackSrc={figmaAssets.teamOffice}
                  altFallback={member.name}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-h3 font-extrabold text-neutral-dark">{member.name}</h3>
                <p className="mt-2 text-body14 font-bold uppercase tracking-[0.8px] text-brand-primary">{member.role}</p>
                {block.showBio !== false && member.bio ? (
                  <div className="mt-5">
                    <RichText value={member.bio} fallback={typeof member.bio === 'string' ? [member.bio] : []} />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

import { Card, Tags, Tag, FadeIn } from '@/components/ui'

const passions = [
  {
    title: 'Home Lab',
    description:
      'I spend time testing small servers, VLANs, and monitoring tools. I enjoy building clean and stable rack setups.',
    tags: ['racks', 'switching', 'pfSense', 'Proxmox'],
  },
  {
    title: 'PC Builds',
    description:
      'I build custom PCs for friends and family, with focus on clean cabling, good cooling, and quiet performance.',
    tags: ['hardware', 'cooling', 'cable management'],
  },
  {
    title: 'Content & Design',
    description:
      'I also do basic edits in After Effects and Photoshop, and build simple websites like this one.',
    tags: ['AE', 'PS', 'web'],
  },
  {
    title: 'Gaming',
    description:
      'I enjoy story-driven games and shooters. I play to improve my skills and to fully dive into the worlds and stories created by developers.',
    tags: ['FPS', 'Story Games', 'Competitive'],
  },
]

export function Passions() {
  return (
    <main className="page bg-transparent py-11 shadow-none">
      <div className="container mx-auto max-w-[1100px] px-5">
        <section className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2">
          {passions.map((p) => (
            <FadeIn key={p.title} className="h-full">
              <Card className="h-full">
                <h2 className="mb-3 text-xl font-bold text-text">{p.title}</h2>
                <p className="mb-4 text-text">{p.description}</p>
                <Tags>
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </Tags>
              </Card>
            </FadeIn>
          ))}
        </section>
      </div>
    </main>
  )
}

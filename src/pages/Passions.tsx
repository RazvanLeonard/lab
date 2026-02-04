import { Card, Tags, Tag, FadeIn } from '@/components/ui'

const passions = [
  {
    title: 'Home Lab',
    description:
      'I like experimenting with small servers, VLANs, and monitoring. Building stable, neat racks is my jam.',
    tags: ['racks', 'switching', 'pfSense', 'Proxmox'],
  },
  {
    title: 'PC Builds',
    description:
      'Custom builds for friends & family — tidy cabling, thermals, and quiet performance.',
    tags: ['hardware', 'cooling', 'cable management'],
  },
  {
    title: 'Content & Design',
    description:
      'Light video edits in After Effects / Photoshop, plus simple sites like this one.',
    tags: ['AE', 'PS', 'web'],
  },
  {
    title: 'Gaming',
    description:
      'Co-op and competitive titles. I enjoy tweaking settings & networks for low latency.',
    tags: ['FPS', 'Racing', 'Co-op'],
  },
]

export function Passions() {
  return (
    <main className="page bg-transparent py-11 shadow-none">
      <div className="container mx-auto max-w-[1100px] px-5">
        <section className="grid gap-5 md:grid-cols-2">
          {passions.map((p) => (
            <FadeIn key={p.title}>
            <Card>
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

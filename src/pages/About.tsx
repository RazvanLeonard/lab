import { Card, Tags, Tag, FadeIn } from '@/components/ui'

export function About() {
  return (
    <main className="page bg-transparent py-11 shadow-none">
      <div className="container mx-auto max-w-[1100px] px-5">
        <section className="grid gap-5 md:grid-cols-2">
          <FadeIn>
            <Card>
              <h2 className="mb-4 text-xl font-bold text-text">Who I am</h2>
              <p className="mb-4 text-text">
                I'm Moise Razvan (Antwerp). I love building hardware, assembling &
                configuring server racks, and trying new technologies to deepen my
                skills. Team player, hands-on learner.
              </p>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li>Drivers: B (18+), A2 (20+)</li>
                <li>Languages: English · Romanian · Dutch</li>
                <li>
                  Email:{' '}
                  <a
                    className="underline decoration-dotted"
                    href="mailto:moiserazvanleonard@gmail.com"
                  >
                    moiserazvanleonard@gmail.com
                  </a>
                </li>
              </ul>
            </Card>
          </FadeIn>

          <FadeIn>
            <Card>
              <h2 className="mb-4 text-xl font-bold text-text">Education</h2>
              <ul className="space-y-2">
                <li>
                  <strong>AP Hogeschool</strong> — System & Network Management
                  (2023–2025)
                </li>
                <li>
                  <strong>Secondary</strong> — Office & Sales (2018–2023)
                </li>
              </ul>
            </Card>
          </FadeIn>
        </section>

        <section className="mt-5">
          <FadeIn>
            <Card>
              <h2 className="mb-4 text-xl font-bold text-text">Skills</h2>
              <Tags>
                <Tag>Cisco Packet Tracer</Tag>
                <Tag>Wireshark</Tag>
                <Tag>Basic C# / HTML</Tag>
                <Tag>After Effects / Photoshop</Tag>
                <Tag>Rack assembly & config</Tag>
                <Tag>Office suite</Tag>
                <Tag>Communication</Tag>
                <Tag>Problem solving</Tag>
              </Tags>
            </Card>
          </FadeIn>
        </section>
      </div>
    </main>
  )
}

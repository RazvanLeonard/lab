import { Card, Tags, Tag, FadeIn } from '@/components/ui'

const jobs = [
  {
    title: "Manager",
    company: "Domino's Pizza",
    meta: '2018–2025 · Antwerp',
    bullets: [
      "Started as courier, then became shift lead, then manager in Schoten and Deurne.",
      "Handled planning, payroll, stock, and daily operations.",
      "Trained team members, solved customer issues, and followed ServSafe standards.",
    ],
  },
  {
    title: 'Assistant Calculation / Admin',
    company: 'Dumobat',
    meta: '2022–2024',
    bullets: [
      'Promoted from intern in the first week.',
      'Supported emails, vendor follow-up, and the calculation team.',
      'Managed invoices, work orders, and internal documents.',
    ],
  },
]

export function Work() {
  return (
    <main className="page bg-transparent py-11 shadow-none">
      <div className="container mx-auto max-w-[1100px] px-5">
        <section className="mb-5">
          <FadeIn>
            <Card className="h-full">
              <h2 className="mb-4 text-xl font-bold text-text">Experience</h2>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.company}
                    className="border-b border-dashed border-white/15 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="m-0 text-lg font-semibold text-text">
                        {job.title}, <span className="text-accent">{job.company}</span>
                      </h3>
                      <span className="text-sm text-muted">{job.meta}</span>
                    </div>
                    <ul className="list-inside list-disc space-y-2 pl-2">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </section>

        <section className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2">
          <FadeIn className="h-full">
            <Card className="h-full">
              <h2 className="mb-4 text-xl font-bold text-text">Tools I use</h2>
              <Tags>
                <Tag>Linux</Tag>
                <Tag>Windows Server</Tag>
                <Tag>SSH</Tag>
                <Tag>Git</Tag>
                <Tag>Docker (basics)</Tag>
                <Tag>VLANs</Tag>
              </Tags>
            </Card>
          </FadeIn>

          <FadeIn className="h-full">
            <Card className="h-full">
              <h2 className="mb-4 text-xl font-bold text-text">Strengths</h2>
              <Tags>
                <Tag>System Admin</Tag>
                <Tag>Networking</Tag>
                <Tag>Troubleshooting</Tag>
                <Tag>Team Player</Tag>
                <Tag>Communication</Tag>
              </Tags>
            </Card>
          </FadeIn>
        </section>
      </div>
    </main>
  )
}

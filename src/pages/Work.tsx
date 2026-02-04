import { Card, Tags, Tag, FadeIn } from '@/components/ui'

const jobs = [
  {
    title: "Manager",
    company: "Domino's Pizza",
    meta: '2018–2025 · Antwerp',
    bullets: [
      "Cycling from courier → shift lead → manager (Schoten & Deurne).",
      "Operations: rosters, payroll, inventory, smooth daily flow.",
      "Training, customer problem solving, ServSafe food safety.",
    ],
  },
  {
    title: 'Assistant Calculation / Admin',
    company: 'Dumobat',
    meta: '2022–2024',
    bullets: [
      'Promoted from intern within a week.',
      'Emails, vendor issue support, calculation dept assistance.',
      'Invoices, work orders, document handling.',
    ],
  },
]

export function Work() {
  return (
    <main className="page bg-transparent py-11 shadow-none">
      <div className="container mx-auto max-w-[1100px] px-5">
        <section className="mb-5">
          <FadeIn>
            <Card>
              <h2 className="mb-4 text-xl font-bold text-text">Experience</h2>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.company}
                    className="border-b border-dashed border-line pb-4 last:border-0 last:pb-0"
                  >
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="m-0 text-lg font-semibold text-text">
                        {job.title} — <span className="text-accent">{job.company}</span>
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

        <section className="grid gap-5 md:grid-cols-2">
          <FadeIn>
            <Card>
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

          <FadeIn>
            <Card>
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

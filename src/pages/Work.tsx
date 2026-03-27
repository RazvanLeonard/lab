import { Card, FadeIn } from '@/components/ui'

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
      'I started as an intern, and during the internship they offered me the opportunity to keep working there in my free time, so I stayed.',
      'I supported the project calculation process and helped prepare estimates for larger projects.',
      'I visited job sites with the person responsible for calculations to learn the workflow and become useful in major project estimation.',
      'I also handled office tasks such as emails, follow-ups, invoices, work orders, and internal documents.',
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
              <h2 className="mb-4 text-xl font-bold text-text">Work Journey</h2>
              <p className="text-text leading-relaxed">
                I started working at the age of 15 and have stayed active up to the
                present. I have always enjoyed integrating into a team, learning on
                the job, and growing inside a company. I focus on personal
                development and regularly take courses to improve my technical and
                professional skills.
              </p>
            </Card>
          </FadeIn>
        </section>

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
      </div>
    </main>
  )
}

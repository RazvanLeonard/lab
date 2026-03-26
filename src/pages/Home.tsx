export function Home() {
  return (
    <main className="home-hero relative flex min-h-[140vh] flex-col items-start overflow-hidden bg-transparent pt-[14vh] md:min-h-[190svh] md:pt-[12svh]">
      <div className="home-effects" aria-hidden="true">
        <span className="hero-star star-1" />
        <span className="hero-star star-2" />
        <span className="hero-star star-3" />
        <span className="hero-star star-4" />
        <span className="hero-star star-5" />
        <span className="hero-star star-6" />
        <span className="hero-star star-7" />
        <span className="hero-star star-8" />
        <span className="hero-glow glow-1" />
        <span className="hero-glow glow-2" />
        <span className="hero-ring" />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1100px] px-5">
        <h1 className="headline m-0 text-[clamp(36px,10vw,96px)] font-extrabold leading-[1.02] tracking-tight md:text-[clamp(40px,8vw,120px)]">
          i'm <span className="text-accent">moise razvan</span>
          <br />
          system &amp; network
          <br />
          enthusiast
        </h1>

        <a
          href="mailto:moiserazvanleonard@gmail.com"
          className="contact-cta mx-auto mt-[clamp(260px,42vh,520px)] flex items-end gap-[0.35em] text-[clamp(28px,5vw,72px)] font-extrabold tracking-tight text-text no-underline md:mt-[clamp(300px,72svh,700px)] md:text-[clamp(26px,7vw,64px)]"
          aria-label="Email Moise"
        >
          <img
            className="cta-emoji relative top-[0.14em] h-[1em] w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            src="/assets/moise-emoji-192.png"
            alt=""
          />
          <span className="leading-none text-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
            get in touch
          </span>
        </a>
      </div>
    </main>
  )
}

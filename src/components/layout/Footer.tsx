export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-5 border-t-0 bg-transparent py-6 text-muted shadow-none">
      <div className="container mx-auto max-w-[1100px] px-5">
        © {year} Moise Razvan — Antwerp
      </div>
    </footer>
  )
}

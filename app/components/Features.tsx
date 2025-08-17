import { Music, Headphones, Radio } from "lucide-react"

const features = [
  { icon: Music, title: "Huge Library", desc: "Millions of songs from all genres." },
  { icon: Headphones, title: "High Quality", desc: "Crystal clear streaming experience." },
  { icon: Radio, title: "Personalized", desc: "Smart playlists made for you." },
]

export function Features() {
  return (
    <section id="features" className="py-16 text-center">
      <h2 className="text-3xl font-bold text-purple-400">Why Choose Us?</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-3 mx-30 text-white shadow-md">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center py-6 rounded-lg bg-gray-900/40 shadow-md hover:shadow-purple-500/20 transition"
          >
            <f.icon className="h-10 w-10 text-purple-400" />
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

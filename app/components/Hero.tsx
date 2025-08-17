export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24">
      <h1 className="text-5xl font-bold text-purple-400">
        Your Music. Your Choice.
      </h1>
      <p className="mt-4 max-w-xl text-gray-300">
        Discover, stream, and enjoy your favorite music with the ultimate experience.
      </p>
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-3 rounded bg-purple-500 hover:bg-purple-600 transition">
          Get Started
        </button>
        <button className="px-6 py-3 rounded border text-white border-purple-400 hover:bg-purple-400 hover:text-black transition">
          Learn More
        </button>
      </div>
    </section>
  )
}

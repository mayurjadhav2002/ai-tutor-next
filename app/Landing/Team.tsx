import React from 'react'

function Team() {
  return (
<section>
  <div className="py-20">
    <div className="mx-auto px-6 max-w-6xl text-gray-500">
      <div className="text-center">
        <h2 className="text-3xl text-gray-950 dark:text-white font-semibold">Built by the Community <br /> for the Community</h2>
        <p className="mt-6 text-gray-700 dark:text-gray-300">Harum quae dolore orrupti aut temporibus ariatur.</p>
      </div>
      <div className="mt-12 max-w-lg mx-auto flex justify-center flex-wrap gap-3">
        <a href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border border-gray-950/5 dark:border-white/5">
          <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-full" loading="lazy" width="120" height="120" />
        </a>
        <a href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border border-gray-950/5 dark:border-white/5">
          <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-full" loading="lazy" width="120" height="120" />
        </a>
        <a href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border border-gray-950/5 dark:border-white/5">
          <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-full" loading="lazy" width="120" height="120" />
        </a>
        <a href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border border-gray-950/5 dark:border-white/5">
          <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-full" loading="lazy" width="120" height="120" />
        </a>
        {/* Repeat the anchor and img elements for other images */}
      </div>
    </div>
  </div>
</section>

  )
}

export default Team
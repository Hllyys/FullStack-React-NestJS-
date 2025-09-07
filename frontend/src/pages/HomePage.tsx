import { Link } from 'react-router-dom';
import { UsersIcon, InboxIcon } from '@heroicons/react/24/solid';

export default function HomePage() {
  return (
    <main className="pt-20">
      <section className="py-20 flex items-start justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
          {/* Users card */}
          <Link
            to="/users"
            className="group flex items-center gap-8 rounded-3xl bg-white/80 backdrop-blur-md p-8 md:p-12 shadow-xl ring-1 ring-black/5 hover:shadow-2xl hover:-translate-y-[2px] transition"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-cyan-600/15 ring-1 ring-cyan-400/30 grid place-items-center">
              <UsersIcon className="w-16 h-16 md:w-20 md:h-20 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Users
              </h2>
              <p className="mt-1 text-gray-600 text-sm md:text-base">
              </p>
            </div>
          </Link>

          {/* Posts card */}
          <Link
            to="/posts"
            className="group flex items-center gap-8 rounded-3xl bg-white/80 backdrop-blur-md p-8 md:p-12 shadow-xl ring-1 ring-black/5 hover:shadow-2xl hover:-translate-y-[2px] transition"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-cyan-600/15 ring-1 ring-cyan-400/30 grid place-items-center">
              <InboxIcon className="w-16 h-16 md:w-20 md:h-20 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Posts
              </h2>
              <p className="mt-1 text-gray-600 text-sm md:text-base">
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

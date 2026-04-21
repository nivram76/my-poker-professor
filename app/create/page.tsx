import { CreateHandForm } from "./CreateHandForm";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] px-4 py-8 text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase text-orange-400">
            PokerSense
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-normal text-zinc-50 sm:text-5xl">
              Create a hand.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-zinc-400">
              Build the hand street by street. Every position starts active, and
              folded players automatically disappear from later streets.
            </p>
          </div>
        </header>

        <CreateHandForm />
      </div>
    </main>
  );
}

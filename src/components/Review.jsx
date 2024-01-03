import { createResource, For, ErrorBoundary } from "solid-js";
const fetcher = async (_, { refetching, value }) => {
    const res = await fetch("/api/reviews", {
        method: refetching ? "POST" : "GET",
        body: refetching ? JSON.stringify(refetching) : null,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    const prev = value ?? [];
    return [...data, ...prev];
};

export default function Reviews({ reviews }) {
    const [data, { refetch }] = createResource(fetcher, {
        initialValue: reviews,
        ssrLoadFrom: "initial",
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString();
        const message = formData.get("message")?.toString();

        if (!name || !message) return;
        refetch({ name, message });
        // clear form
        e.currentTarget.reset();
    };

    return (
        <div className="max-w-3xl w-full">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <form
          onSubmit={onSubmitHandler}
          className="block border bg-blue-100 border-blue-300 rounded-md p-6 dark:bg-blue-950 dark:border-blue-800"
        >
          <div>
            <label
              className="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Sam"
              required
              name="name"
              className="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
            />
          </div>
          <div className="mt-3">
            <label
              className="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm"
              htmlFor="message"
            >
              Message
            </label>
            <input
              id="message"
              type="text"
              className="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
              placeholder="A friendly message"
              required
              name="message"
            />
          </div>
          <button
            className="w-full dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 border dark:border-zinc-100 rounded-md mt-4 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={data.loading}
          >
            Submit
          </button>
        </form>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <For each={data()}>
            {(review) => (
              <li className="p-4 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{review.name}</p>
                <p className="mt-1">{review.message}</p>
              </li>
            )}
          </For>
        </ul>
            </ErrorBoundary>
        </div>
    );
}
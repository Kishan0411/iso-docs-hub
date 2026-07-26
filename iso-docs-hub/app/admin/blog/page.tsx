import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTopbar from "@/components/admin/topbar";
import { blogPosts } from "@/lib/data";

export default function AdminBlogPage() {
  return (
    <div>
      <AdminTopbar title="Blog" />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">{blogPosts.length} posts</p>
          <button className="flex items-center gap-2 rounded-md bg-signal-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-signal-600">
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Author</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {blogPosts.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-3">
                    <Link href={`/blog/${p.slug}`} className="font-medium text-ink dark:text-white hover:text-signal-500">{p.title}</Link>
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{p.category}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{p.author}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                      <button className="p-1.5 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { getCurrentUserProfile } from "@/lib/current-profile";
import { updateProfile } from "@/app/actions/profile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">プロフィール</h1>

      <form action={updateProfile} className="space-y-6">
        {/* 表示名 */}
        <div>
          <label htmlFor="displayName" className="mb-2 block font-medium">
            表示名
          </label>

          <input
            id="displayName"
            name="displayName"
            type="text"
            defaultValue={profile.displayName ?? ""}
            className="w-full rounded border p-3"
            required
          />
        </div>

        {/* 自己紹介 */}
        <div>
          <label htmlFor="bio" className="mb-2 block font-medium">
            自己紹介
          </label>

          <textarea
            id="bio"
            name="bio"
            rows={6}
            defaultValue={profile.bio ?? ""}
            className="w-full rounded border p-3"
          />
        </div>

        {/* メールアドレス（編集不可） */}
        <div>
          <label className="mb-2 block font-medium">メールアドレス</label>

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full rounded border bg-gray-100 p-3"
          />
        </div>

        {/* 権限
        <div>
          <label className="mb-2 block font-medium">権限</label>

          <input
            value={profile.role}
            disabled
            className="w-full rounded border bg-gray-100 p-3"
          />
        </div> */}

        <button
          type="submit"
          className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          保存
        </button>
      </form>
    </main>
  );
}

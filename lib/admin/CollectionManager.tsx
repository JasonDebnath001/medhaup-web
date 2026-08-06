"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  UploadCloud,
  Check,
} from "lucide-react";
import clsx from "clsx";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Collection, Field } from "@/lib/admin/collections";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export default function CollectionManager({
  collection,
}: {
  collection: Collection;
}) {
  const supabase = supabaseBrowser();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from(collection.table)
      .select("*")
      .order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }, [collection.table, supabase]);

  useEffect(() => {
    load();
  }, [load]);

  /* ---------- helpers ---------- */
  const openNew = () => {
    const blank: Row = {};
    collection.fields.forEach((f) => {
      blank[f.name] =
        f.type === "boolean"
          ? false
          : f.type === "number"
            ? ""
            : f.type === "tags"
              ? ""
              : "";
    });
    setForm(blank);
    setEditing("new");
    setError("");
  };

  const openEdit = (row: Row) => {
    const values: Row = {};
    collection.fields.forEach((f) => {
      values[f.name] =
        f.type === "tags" && Array.isArray(row[f.name])
          ? row[f.name].join(", ")
          : (row[f.name] ?? "");
    });
    setForm(values);
    setEditing(row);
    setError("");
  };

  const set = (name: string, value: unknown) =>
    setForm((f) => ({ ...f, [name]: value }));

  const uploadFile = async (field: Field, file: File) => {
    setUploading(field.name);
    const path = `${collection.slug}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage
      .from(field.bucket!)
      .upload(path, file);
    if (error) {
      setError(`Upload failed: ${error.message}`);
    } else {
      const { data } = supabase.storage.from(field.bucket!).getPublicUrl(path);
      set(field.name, data.publicUrl);
      // Auto-fill file_size if this collection has that field
      if (collection.fields.some((f) => f.name === "file_size")) {
        const mb = file.size / (1024 * 1024);
        set(
          "file_size",
          mb >= 1
            ? `${mb.toFixed(1)} MB`
            : `${Math.round(file.size / 1024)} KB`,
        );
      }
    }
    setUploading(null);
  };

 const slugify = (s: string) =>
    s.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const save = async () => {
    setError("");
    // Auto-generate blog slug from title if left empty
    const working = { ...form };
    if (
      collection.fields.some((f) => f.name === "slug") &&
      !String(working.slug ?? "").trim() &&
      String(working.title ?? "").trim()
    ) {
      working.slug = slugify(String(working.title));
    }
    for (const f of collection.fields) {
      if (f.required && f.name !== "slug" && !String(working[f.name] ?? "").trim()) {
        setError(`"${f.label}" is required.`);
        return;
      }
    }
    setSaving(true);
    const payload: Row = {};
    collection.fields.forEach((f) => {
      let v = working[f.name];
      if (f.type === "number") v = v === "" || v === null ? null : Number(v);
      if (f.type === "tags")
        v = String(v).split(",").map((t: string) => t.trim()).filter(Boolean);
      if (v === "")
        v =
          f.type === "text" || f.type === "textarea" || f.type === "paragraphs"
            ? ""
            : null;
      payload[f.name] = v;
    });

    const q =
      editing === "new"
        ? supabase.from(collection.table).insert(payload)
        : supabase.from(collection.table).update(payload).eq("id", (editing as Row).id);
    const { error } = await q;
    setSaving(false);
    if (error) setError(error.message);
    else {
      setEditing(null);
      load();
    }
  };

  const togglePublish = async (row: Row) => {
    await supabase
      .from(collection.table)
      .update({ published: !row.published })
      .eq("id", row.id);
    load();
  };

/* Extract "bucket" + "path" from a Supabase public URL:
     .../storage/v1/object/public/<bucket>/<path> */
  const parseStorageUrl = (url: string) => {
    const m = String(url).match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    return m ? { bucket: m[1], path: decodeURIComponent(m[2]) } : null;
  };

  const remove = async (row: Row) => {
    if (
      !confirm(
        `Delete this ${collection.singular.toLowerCase()}? Its uploaded files will also be deleted. This cannot be undone.`
      )
    )
      return;

    // Clean up any storage files referenced by file/image fields
    const fileFields = collection.fields.filter(
      (f) => f.type === "file" || f.type === "image"
    );
    for (const f of fileFields) {
      const parsed = row[f.name] ? parseStorageUrl(row[f.name]) : null;
      if (parsed) {
        await supabase.storage.from(parsed.bucket).remove([parsed.path]);
      }
    }

    await supabase.from(collection.table).delete().eq("id", row.id);
    load();
  };

  /* ---------- render ---------- */
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy">
            {collection.title}
          </h1>
          <p className="mt-1 text-sm text-navy/60">
            Unpublished items are hidden from the website. Zero published items
            = Coming Soon page.
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
        >
          <Plus size={16} /> Add {collection.singular}
        </button>
      </div>

      {/* List */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
        {loading ? (
          <div className="grid place-items-center p-12">
            <Loader2 className="animate-spin text-navy/40" />
          </div>
        ) : rows.length === 0 ? (
          <p className="p-10 text-center text-sm text-navy/50">
            Nothing here yet — add your first{" "}
            {collection.singular.toLowerCase()}.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy/10 bg-cream text-xs uppercase tracking-wide text-navy/50">
              <tr>
                <th className="px-4 py-3">Status</th>
                {collection.listCols.map((c) => (
                  <th key={c} className="px-4 py-3">
                    {c.replace(/_/g, " ")}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-cream/60">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(row)}
                      className={clsx(
                        "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors",
                        row.published
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-navy/8 text-navy/50 hover:bg-navy/15",
                      )}
                    >
                      {row.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {row.published ? "LIVE" : "DRAFT"}
                    </button>
                  </td>
                  {collection.listCols.map((c) => (
                    <td
                      key={c}
                      className="max-w-56 truncate px-4 py-3 text-navy/80"
                    >
                      {String(row[c] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => openEdit(row)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-navy/60 transition-colors hover:bg-navy/5 hover:text-navy"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => remove(row)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-navy/60 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Editor drawer */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy/40 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
              <h2 className="font-heading font-bold text-navy">
                {editing === "new"
                  ? `Add ${collection.singular}`
                  : `Edit ${collection.singular}`}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="grid h-9 w-9 place-items-center rounded-full text-navy transition-colors hover:bg-navy/5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {collection.fields.map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                    {f.label}{" "}
                    {f.required && <span className="text-orange">*</span>}
                  </label>

                  {(f.type === "text" ||
                    f.type === "number" ||
                    f.type === "date") && (
                    <input
                      type={
                        f.type === "number"
                          ? "number"
                          : f.type === "date"
                            ? "date"
                            : "text"
                      }
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-navy/15 px-4 py-2.5 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  )}

                  {(f.type === "textarea" || f.type === "paragraphs") && (
                    <textarea
                      rows={f.type === "paragraphs" ? 10 : 3}
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-navy/15 px-4 py-2.5 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  )}

                  {f.type === "tags" && (
                    <input
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-navy/15 px-4 py-2.5 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  )}

                  {f.type === "select" && (
                    <select
                      value={form[f.name] ?? f.options?.[0]}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-orange"
                    >
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}

                  {f.type === "boolean" && (
                    <button
                      type="button"
                      onClick={() => set(f.name, !form[f.name])}
                      className={clsx(
                        "mt-1.5 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                        form[f.name]
                          ? "border-orange bg-orange/10 text-orange"
                          : "border-navy/15 text-navy/60",
                      )}
                    >
                      <span
                        className={clsx(
                          "grid h-4 w-4 place-items-center rounded border",
                          form[f.name]
                            ? "border-orange bg-orange text-white"
                            : "border-navy/30",
                        )}
                      >
                        {form[f.name] && <Check size={11} />}
                      </span>
                      {form[f.name] ? "Yes" : "No"}
                    </button>
                  )}

                  {(f.type === "file" || f.type === "image") && (
                    <div className="mt-1.5">
                      <label
                        className={clsx(
                          "flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-4 text-sm font-medium transition-colors",
                          form[f.name]
                            ? "border-green-300 bg-green-50 text-green-700"
                            : "border-navy/20 text-navy/60 hover:border-orange hover:text-orange",
                        )}
                      >
                        {uploading === f.name ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />{" "}
                            Uploading…
                          </>
                        ) : form[f.name] ? (
                          <>
                            <Check size={16} /> Uploaded — click to replace
                          </>
                        ) : (
                          <>
                            <UploadCloud size={16} /> Click to upload
                          </>
                        )}
                        <input
                          type="file"
                          accept={f.accept}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadFile(f, file);
                          }}
                        />
                      </label>
                      {f.type === "image" && form[f.name] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={form[f.name]}
                          alt="preview"
                          className="mt-2 h-24 rounded-lg object-cover"
                        />
                      )}
                    </div>
                  )}

                  {f.help && (
                    <p className="mt-1 text-xs text-navy/45">{f.help}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-navy/10 px-6 py-4">
              {error && (
                <p className="mb-3 text-sm font-medium text-red-600">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={save}
                  disabled={saving || uploading !== null}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-xl border border-navy/15 px-5 py-3 font-semibold text-navy transition-colors hover:bg-navy/5"
                >
                  Cancel
                </button>
              </div>
              <p className="mt-2 text-xs text-navy/45">
                Saved items start as DRAFT — press the status badge in the list
                to make them LIVE.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

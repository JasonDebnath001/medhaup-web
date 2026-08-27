"use client";

import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";

const FIELDS = [
  { key: "phone", label: "Phone (digits only)" },
  { key: "phoneDisplay", label: "Phone (display format)" },
  { key: "email", label: "Email" },
  { key: "callingHours", label: "Calling hours" },
  { key: "address", label: "Address / location line" },
  { key: "whatsappNumber", label: "WhatsApp number (country code, no +)" },
  { key: "whatsappPrefill", label: "WhatsApp pre-filled message" },
  { key: "channelUrl", label: "WhatsApp Channel URL" },
  { key: "youtubeUrl", label: "YouTube URL" },
  { key: "instagramUrl", label: "Instagram URL" },
  { key: "telegramUrl", label: "Telegram URL" },
] as const;

export default function SettingsPage() {
  const supabase = supabaseBrowser();
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("data")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data: row }) => {
        setData(row?.data ?? {});
        setLoading(false);
      });
  }, [supabase]);

  const save = async () => {
    setSaving(true);
    await supabase.from("site_settings").upsert({ id: 1, data });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading)
    return (
      <div className="grid min-h-48 place-items-center">
        <Loader2 className="animate-spin text-navy/40" />
      </div>
    );

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-extrabold text-navy">
        Site Settings
      </h1>
      <p className="mt-1 text-sm text-navy/60">
        Contact details and WhatsApp links used across the whole website.
      </p>
      <div className="mt-6 space-y-5 rounded-2xl border border-navy/10 bg-white p-4 shadow-sm sm:p-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-semibold uppercase tracking-wide text-navy/60">
              {f.label}
            </label>
            <input
              value={data[f.key] ?? ""}
              onChange={(e) =>
                setData((current) => ({
                  ...current,
                  [f.key]: e.target.value,
                }))
              }
              className="mt-1.5 min-h-11 w-full rounded-xl border border-navy/15 px-4 py-2.5 text-base text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 sm:text-sm"
            />
          </div>
        ))}
        <button
          onClick={save}
          disabled={saving}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
        >
          {saving ? (
            <Loader2 size={17} className="animate-spin" />
          ) : saved ? (
            <>
              <Check size={17} /> Saved
            </>
          ) : (
            "Save Settings"
          )}
        </button>
      </div>
    </div>
  );
}

import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { ImageResponse } from "next/og";
import { siteSettings } from "@/data/site-settings";

// Link-preview image shown when a page is shared (LinkedIn, WhatsApp, X…).
// Each route's opengraph-image.tsx calls this with its own text.
export const ogSize = { width: 1200, height: 630 };

const colors = {
  background: "#05070d",
  foreground: "#e9ecf5",
  muted: "#94a1c2",
  accent: "#22d3ee",
};

// Reads an image from /public as a data URI, since the renderer can't fetch
// site-relative paths.
async function publicImage(src: string) {
  const type = extname(src).slice(1).replace("jpg", "jpeg");
  const data = await readFile(join(process.cwd(), "public", src));
  return `data:image/${type};base64,${data.toString("base64")}`;
}

export async function ogImage({
  eyebrow,
  title,
  subtitle,
  photo,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  photo?: string; // path in /public, shown on the right
}) {
  const photoData = photo ? await publicImage(photo) : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: colors.background,
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(124,58,237,0.45), transparent 45%), radial-gradient(circle at 85% 90%, rgba(34,211,238,0.3), transparent 45%)",
          color: colors.foreground,
          padding: 64,
          gap: 48,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 600 }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, backgroundColor: colors.accent }} />
            {siteSettings.shortName}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: colors.accent,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: photoData ? 52 : 64,
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: -1,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ marginTop: 22, fontSize: 28, lineHeight: 1.4, color: colors.muted }}>{subtitle}</div>
            )}
          </div>

          {/* Smaller beside a photo so it stays on one line. */}
          <div style={{ display: "flex", fontSize: photoData ? 20 : 24, color: colors.muted }}>
            {siteSettings.labName} · IIT Madras
          </div>
        </div>

        {photoData && (
          // eslint-disable-next-line @next/next/no-img-element -- the image renderer needs a plain <img>
          <img
            src={photoData}
            alt=""
            width={420}
            height={502}
            style={{ objectFit: "cover", borderRadius: 32, border: "2px solid #202a44" }}
          />
        )}
      </div>
    ),
    ogSize
  );
}

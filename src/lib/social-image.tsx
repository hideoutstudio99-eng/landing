import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

/* Shared artwork for app/opengraph-image.tsx and app/twitter-image.tsx. */

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageAlt = `${site.name} — ${site.tagline} A private studio stay you book direct.`;

const BRAND = "#E9474E";
const INK = "#111111";

const [oswaldMedium, oswaldBold, photo] = await Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/oswald-latin-500-normal.woff")),
  readFile(join(process.cwd(), "src/assets/fonts/oswald-latin-700-normal.woff")),
  readFile(join(process.cwd(), "public/images/bedroom.jpg"), "base64"),
]);
const photoSrc = `data:image/jpeg;base64,${photo}`;

export function renderSocialImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff" }}>
        {/* Arch-shaped photo on a red door-hanger panel, echoing the logo. */}
        <div
          style={{
            display: "flex",
            width: 440,
            height: "100%",
            background: BRAND,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 330,
              height: 500,
              borderRadius: "165px 165px 0 0",
              overflow: "hidden",
              border: "10px solid #ffffff",
              borderBottom: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders this, not the browser */}
            <img src={photoSrc} width={310} height={490} style={{ objectFit: "cover" }} alt="" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "0 56px",
            fontFamily: "Oswald",
            textTransform: "uppercase",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: 5, color: BRAND }}>
            Direct booking · No platform fees
          </div>
          <div
            style={{
              fontSize: 168,
              fontWeight: 700,
              lineHeight: 1,
              marginTop: 18,
              color: INK,
            }}
          >
            Hideout
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: 10,
              color: BRAND,
            }}
          >
            Studios
          </div>
          <div
            style={{
              marginTop: 34,
              paddingTop: 18,
              borderTop: `5px solid ${BRAND}`,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: 8,
              color: "#3d3a3a",
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...socialImageSize,
      fonts: [
        { name: "Oswald", data: oswaldMedium, weight: 500, style: "normal" },
        { name: "Oswald", data: oswaldBold, weight: 700, style: "normal" },
      ],
    },
  );
}

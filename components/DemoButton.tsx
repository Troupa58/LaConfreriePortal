"use client";

import { useEffect, useState } from "react";

export function DemoButton({
  label,
  primary = false,
  discord = false
}: {
  label: string;
  primary?: boolean;
  discord?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(() => setVisible(false), 2800);
    return () => window.clearTimeout(timeout);
  }, [visible]);

  const classes = [
    "button",
    discord ? "buttonDiscord" : primary ? "buttonPrimary" : "buttonSecondary"
  ].join(" ");

  return (
    <>
      <button className={classes} type="button" onClick={() => setVisible(true)}>
        {label}
      </button>
      <div className={`toast ${visible ? "show" : ""}`} role="status" aria-live="polite">
        Cette fonctionnalité sera activée dans la prochaine étape.
      </div>
    </>
  );
}

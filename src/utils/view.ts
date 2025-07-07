export function formatViews(views: number): string {
  // 1) ≥ 1 Billion
  if (views >= 1_000_000_000) {
    return (
      (Math.round((views / 1_000_000_000) * 10) / 10) // satu digit
        .toFixed(1)
        .replace(/\.0$/, "") + "B"
    );
  }

  if (views >= 1_000_000) {
    return (Math.round((views / 1_000_000) * 10) / 10).toFixed(1).replace(/\.0$/, "") + "M";
  }

  if (views >= 1_000) {
    return (Math.round((views / 1_000) * 10) / 10).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return views.toString();
}

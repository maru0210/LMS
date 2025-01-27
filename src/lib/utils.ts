export function cn(...className: (string | undefined | false)[]) {
  return className.join(" ");
}

export function toZenkaku(n: number) {
  return String(n).replace(/[0-9]/g, (s) =>
    String.fromCharCode(Number(s) + "０".charCodeAt(0)),
  );
}

export function fmtDate(date: Date) {
  return (
    date.toLocaleDateString() + " " + date.toLocaleTimeString().slice(0, -3)
  );
}

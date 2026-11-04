export function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 20.7l1.4-4.8A8.5 8.5 0 1 1 20.5 11.8Z"/><path d="M8 7.5c-.8 1.2-.5 3 1.5 5s3.8 2.7 5.2 1.8l1-1.1-2.5-1.5-.8.8c-1.2-.5-2.2-1.5-2.8-2.7l.8-.8L9 6.8Z"/></svg>;
}

export function HorseIcon({ stable = false, rider = false }: { stable?: boolean; rider?: boolean }) {
  return <svg className="horse-icon" viewBox="0 0 100 85" fill="currentColor" aria-hidden="true">
    {stable && <><path d="M5 35 50 5l45 30v48H5Z" opacity=".15"/><path d="m3 35 47-31 47 31-3 5L50 11 6 40Z"/><path d="M10 38h5v44h-5zm75 0h5v44h-5z"/></>}
    {rider && <><circle cx="52" cy="12" r="6"/><path d="m48 19-5 20 13 7 8-3-14-9 7-13Zm-1 21-9 18 5 3 13-18Z"/></>}
    <path d="m19 49 11-10 27 2 11-19 6-7 2 9 9 7 4 12-6 3-8-7-7 15-10 7-24-2-6 14-5 9h-5l9-26-4-3-7 8-9 2-3-3 12-7Zm17 11 6 1-3 15-5 6h-5l5-8Zm21 0 7-5 4 20 8 6h-7l-7-6Zm15-8 5-7 2 23 9 8h-6l-9-7Z"/>
    <path d="M27 40C13 32 7 45 9 62c4-6 7-14 18-16Z"/>
  </svg>;
}
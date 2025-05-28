'use client';

export default function HtmlRenderer({ html }) {
  return (
    <div
      className="prose prose-lg max-w-none"
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
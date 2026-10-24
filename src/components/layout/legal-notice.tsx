import { AlertTriangle } from "lucide-react";

/**
 * Shown on legal pages until the text has been reviewed. Remove this
 * component from the page once a qualified reviewer has approved the wording
 * and the bracketed placeholders are filled in.
 */
export function LegalNotice() {
  return (
    <div
      role="note"
      className="flex max-w-[760px] items-start gap-3 rounded-md border border-line bg-surface-2 p-4 text-sm text-fg-muted"
    >
      <AlertTriangle aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand" />
      <p>
        <strong className="text-fg">Draft for review.</strong> This page is a structural template.
        Text in [brackets] must be completed and the whole page reviewed by a qualified legal
        professional for the applicable jurisdiction before publication.
      </p>
    </div>
  );
}

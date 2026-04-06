interface AdminFormProps {
  children: React.ReactNode;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  cancelHref?: string;
}

export default function AdminForm({
  children,
  action,
  submitLabel = "Save",
  cancelHref,
}: AdminFormProps) {
  return (
    <form action={action} className="space-y-6">
      <div className="rounded-sm bg-white p-6 shadow-sm border border-gray-100 space-y-5">
        {children}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-terracotta px-6 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          {submitLabel}
        </button>
        {cancelHref && (
          <a
            href={cancelHref}
            className="font-body text-sm text-driftwood hover:text-dark-driftwood transition-colors"
          >
            Cancel
          </a>
        )}
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, required, hint, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-body text-sm font-medium text-dark-driftwood mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1 font-body text-xs text-driftwood">{hint}</p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full border border-gray-200 px-3 py-2.5 font-body text-sm outline-none focus:border-muted-ocean transition-colors ${className}`}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full border border-gray-200 px-3 py-2.5 font-body text-sm outline-none focus:border-muted-ocean transition-colors resize-vertical ${className}`}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full border border-gray-200 px-3 py-2.5 font-body text-sm outline-none focus:border-muted-ocean transition-colors bg-white ${className}`}
    >
      {children}
    </select>
  );
}

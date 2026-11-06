import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Nana Fashion and Shoes" },
    { name: "description", content: "Get in touch with Nana Fashion and Shoes Shop in Kigali." },
    { property: "og:title", content: "Contact Nana Fashion" },
    { property: "og:description", content: "Phone, email and store location." },
  ] }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setForm({ name: "", email: "", message: "" });
    toast.success("Thank you! Your message has been sent.");
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="text-center animate-rise">
        <p className="text-xs tracking-[0.3em] uppercase text-gold">Get in touch</p>
        <h1 className="mt-2 text-5xl md:text-6xl">Contact Us</h1>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          {[[Phone, "Phone", "+250 788 000 000"], [Mail, "Email", "hello@nanafashion.rw"], [MapPin, "Store", "KN 4 Ave, Kigali City Center, Rwanda"]].map(([Icon, l, v]) => {
            const I = Icon as typeof Phone;
            return (
              <div key={l as string} className="flex gap-4 border border-border p-5 transition-colors hover:border-gold">
                <I className="h-6 w-6 text-gold" />
                <div><p className="text-xs tracking-widest uppercase text-muted-foreground">{l as string}</p><p className="mt-1">{v as string}</p></div>
              </div>
            );
          })}
        </div>
        <form onSubmit={submit} className="space-y-4 bg-card p-8 shadow-soft" noValidate>
          {(["name", "email"] as const).map((f) => (
            <div key={f}>
              <Input placeholder={f === "name" ? "Your name" : "Your email"} type={f === "email" ? "email" : "text"} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="rounded-none" />
              {errors[f] && <p className="mt-1 text-xs text-destructive">{errors[f]}</p>}
            </div>
          ))}
          <div>
            <Textarea placeholder="Your message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-none" />
            {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full rounded-none">Send Message</Button>
        </form>
      </div>
    </div>
  );
}

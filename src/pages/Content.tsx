import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export function About() {
  return (
    <div className="container-px mx-auto py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our story</p>
        <h1 className="mt-3 font-display text-5xl">Considered clothing for everyday life</h1>
        <p className="mt-6 text-muted-foreground">Founded in 2018, Atelier creates timeless pieces designed to outlast trends. Our garments are made in small batches by long-term partner factories using natural and recycled fibers.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80" alt="" className="mx-auto mt-12 aspect-[16/7] w-full max-w-5xl rounded-md object-cover" />
      <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-3">
        {[
          ["Material", "Premium natural and recycled fibers, sourced responsibly."],
          ["Craft", "Made by skilled hands in small ethical batches."],
          ["Longevity", "Pieces designed to live in your wardrobe for years."],
        ].map(([t, d]) => (
          <div key={t}><h3 className="font-display text-2xl">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
        ))}
      </div>
    </div>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Min 10 characters").max(1000),
});

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof contactSchema>>({ resolver: zodResolver(contactSchema) });
  const onSubmit = async () => { await new Promise((r) => setTimeout(r, 600)); toast.success("Message sent"); reset(); };
  return (
    <div className="container-px mx-auto py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl">Get in touch</h1>
          <p className="mt-3 text-muted-foreground">We typically respond within 24 hours, Monday to Friday.</p>
          <div className="mt-8 space-y-3 text-sm">
            <p className="flex items-center gap-3"><Mail className="h-4 w-4"/> hello@atelier.com</p>
            <p className="flex items-center gap-3"><Phone className="h-4 w-4"/> +1 (555) 010-2025</p>
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4"/> 245 Mercer Street, New York, NY</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-md border p-6">
          <div><Label className="mb-1.5 block text-xs">Name</Label><Input {...register("name")} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}</div>
          <div><Label className="mb-1.5 block text-xs">Email</Label><Input type="email" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
          <div><Label className="mb-1.5 block text-xs">Message</Label><Textarea rows={5} {...register("message")} />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}</div>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send message"}</Button>
        </form>
      </div>
    </div>
  );
}

const faqs = [
  ["How long does shipping take?","Standard 3–5 business days. Express 1–2 days. International 7–14 days."],
  ["What is your return policy?","30 days from delivery. Items must be unworn with tags attached."],
  ["Do you ship internationally?","Yes, to over 60 countries. Shipping costs calculated at checkout."],
  ["How do I find my size?","Each product page has a size guide. Reach out if you need a personal recommendation."],
  ["Are your products ethically made?","Yes. We work with long-term partner factories with audited working conditions."],
  ["How do I care for my garments?","Each item includes care instructions. We recommend cold wash and air dry to extend life."],
];

export function FAQ() {
  return (
    <div className="container-px mx-auto max-w-3xl py-16">
      <h1 className="font-display text-5xl">Frequently asked</h1>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map(([q, a]) => (
          <AccordionItem key={q} value={q}><AccordionTrigger className="text-left">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function Policy({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <div className="container-px mx-auto max-w-3xl py-16">
      <h1 className="font-display text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>
      <div className="prose prose-sm mt-10 max-w-none space-y-8">
        {sections.map(([h, p]) => (
          <section key={h}><h2 className="font-display text-2xl">{h}</h2><p className="mt-2 text-muted-foreground">{p}</p></section>
        ))}
      </div>
      <Link to="/" className="mt-12 inline-block text-sm underline">← Back to home</Link>
    </div>
  );
}
export const Privacy = () => <Policy title="Privacy Policy" sections={[
  ["Information we collect","We collect information you provide when placing an order, contacting us, or subscribing to our newsletter."],
  ["How we use information","To process orders, communicate with you, and improve our products and services."],
  ["Data sharing","We do not sell your data. We share with shipping and payment partners only as needed."],
  ["Your rights","You may request access, correction, or deletion of your data at any time."],
]} />;
export const Terms = () => <Policy title="Terms & Conditions" sections={[
  ["Acceptance","By using this site you agree to these terms."],
  ["Orders","All orders are subject to availability and acceptance."],
  ["Pricing","Prices are in USD and subject to change without notice."],
  ["Liability","Our liability is limited to the value of your order."],
]} />;
export const Returns = () => <Policy title="Returns & Refunds" sections={[
  ["Return window","30 days from delivery for unworn items with tags."],
  ["Process","Email returns@atelier.com with your order number to start a return."],
  ["Refund timing","Refunds processed within 5–7 business days of receipt."],
  ["Exchanges","Free exchanges within the US. International exchanges as store credit."],
]} />;

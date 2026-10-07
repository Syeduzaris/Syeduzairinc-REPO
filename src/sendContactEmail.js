import emailjs from "@emailjs/browser";

export async function sendContactEmail(formElement) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables are missing");
  }

  return emailjs.sendForm(serviceId, templateId, formElement, { publicKey });
}

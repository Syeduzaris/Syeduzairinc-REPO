import emailjs from "@emailjs/browser";

export async function sendContactEmail(formElement) {
  const serviceId = "service_cco984b";
  const templateId = "template_ov3nilu";
  const publicKey = "5Edj6sUbR2D3o9qlo";

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables are missing");
  }

  return emailjs.sendForm(serviceId, templateId, formElement, { publicKey });
}

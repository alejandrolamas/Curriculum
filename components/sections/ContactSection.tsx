"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import toast from "react-hot-toast";

const contactInfo = {
  email: "hola@alejandrolamas.es",
  phone: "+34 667 894 561",
  location: "Madrid, España",
  linkedin: "https://www.linkedin.com/in/alejandrolamasperez/",
  github: "https://github.com/alejandrolamas",
};

const socialLinks = [
  {
    name: "LinkedIn",
    url: contactInfo.linkedin,
    icon: "in",
    color: "#0077b5",
  },
  {
    name: "GitHub",
    url: contactInfo.github,
    icon: "⌥",
    color: "#ffffff",
  },
  {
    name: "Email",
    url: `mailto:${contactInfo.email}`,
    icon: "✉",
    color: "#ffa001",
  },
];

// Generar números aleatorios para el captcha
function generateCaptcha(): { num1: number; num2: number; timestamp: number } {
  return {
    num1: Math.floor(Math.random() * 10) + 1,
    num2: Math.floor(Math.random() * 10) + 1,
    timestamp: Date.now(),
  };
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, timestamp: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    honeypot: "", // Campo trampa para bots
  });

  // Generar captcha al montar el componente
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaAnswer("");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar captcha antes de enviar
    const expectedAnswer = captcha.num1 + captcha.num2;
    if (parseInt(captchaAnswer) !== expectedAnswer) {
      toast.error("Verificación incorrecta. Inténtalo de nuevo.");
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaNum1: captcha.num1,
          captchaNum2: captcha.num2,
          captchaAnswer: parseInt(captchaAnswer),
          captchaTimestamp: captcha.timestamp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      toast.success("¡Mensaje enviado! Te responderé pronto 🚀");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        honeypot: "",
      });
      refreshCaptcha();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al enviar";
      toast.error(errorMessage);
      refreshCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full font-mono text-sm text-[var(--text-tertiary)] mb-4">
          <span className="text-[var(--color-success)]">⬢</span>
          <span>MÓDULO://CONECTAR</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          <span className="gradient-text">CONTACTO</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
          ¿Tienes un proyecto en mente? ¿Buscas un desarrollador para tu equipo?
          Establece una conexión neural directa.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <GlassCard hover={false}>
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-primary)]">▸</span>
              INICIAR TRANSMISIÓN
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot - Campo oculto anti-bots */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="absolute opacity-0 pointer-events-none h-0 w-0"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-tertiary)] mb-2">
                    NOMBRE *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--text-tertiary)] mb-2">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-tertiary)] mb-2">
                    TELÉFONO
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                    placeholder="+34 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--text-tertiary)] mb-2">
                    EMPRESA
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                    placeholder="Tu empresa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-tertiary)] mb-2">
                  ASUNTO *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="¿De qué quieres hablar?"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-tertiary)] mb-2">
                  MENSAJE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                  placeholder="Cuéntame más sobre tu proyecto..."
                />
              </div>

              {/* Captcha Custom */}
              <div className="p-4 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                <label className="block text-xs font-mono text-[var(--text-tertiary)] mb-3">
                  <span className="text-[var(--color-accent)]">🔐</span> VERIFICACIÓN DE SEGURIDAD
                </label>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
                    <span className="text-[var(--color-primary)] font-mono font-bold text-lg">
                      {captcha.num1}
                    </span>
                    <span className="text-[var(--text-secondary)]">+</span>
                    <span className="text-[var(--color-secondary)] font-mono font-bold text-lg">
                      {captcha.num2}
                    </span>
                    <span className="text-[var(--text-secondary)]">=</span>
                  </div>
                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    required
                    className="w-20 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-center outline-none focus:border-[var(--color-primary)] transition-colors"
                    placeholder="?"
                  />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-primary)] transition-colors"
                    title="Nueva operación"
                  >
                    ↻
                  </button>
                </div>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                  Resuelve la operación para confirmar que no eres un bot
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-4 rounded-xl font-mono font-semibold
                  transition-all duration-300 flex items-center justify-center gap-2
                  ${isSubmitting
                    ? "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed"
                    : "bg-[var(--color-primary)] text-[var(--bg-primary)] hover:opacity-90"
                  }
                `}
                style={{ boxShadow: isSubmitting ? "none" : "var(--glow-primary)" }}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">◎</span>
                    TRANSMITIENDO...
                  </>
                ) : (
                  <>
                    <span>◈</span>
                    ENVIAR MENSAJE
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </motion.div>

        {/* Contact Info & Social */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Quick Contact */}
          <GlassCard>
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◈</span>
              ACCESO DIRECTO
            </h3>

            <div className="space-y-4">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                  📱
                </div>
                <div>
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">TELÉFONO</p>
                  <p className="text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {contactInfo.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-secondary)]">
                  ✉
                </div>
                <div>
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">EMAIL</p>
                  <p className="text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {contactInfo.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                  📍
                </div>
                <div>
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">UBICACIÓN</p>
                  <p className="text-[var(--text-primary)]">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Social Links */}
          <GlassCard>
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-success)]">⬡</span>
              REDES NEURALES
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-all hover:scale-105 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-colors"
                    style={{
                      backgroundColor: `${link.color}20`,
                      color: link.color,
                    }}
                  >
                    {link.icon}
                  </div>
                  <span className="text-xs font-mono text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Availability */}
          <GlassCard className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span className="text-sm font-mono text-[var(--color-success)]">
                DISPONIBLE
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Abierto a nuevas oportunidades y colaboraciones
            </p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-[var(--text-tertiary)] font-mono">
          <span className="text-[var(--color-accent)]">◎</span> Tiempo de respuesta habitual: 
          <span className="text-[var(--color-primary)]"> &lt;24 horas</span>
        </p>
      </motion.div>
    </div>
  );
}

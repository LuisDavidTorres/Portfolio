import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactForm() {
  const [load, setLoad] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const notify = () => toast("Mensaje enviado correctamente");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoad(true);
      const formData = new FormData(event.target as HTMLFormElement);
      const response = await fetch("/api/resend", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        notify();
        (event.target as HTMLFormElement).reset();
      } else {
        toast.error("Hubo un problema al enviar el mensaje. Inténtalo nuevamente.");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error);
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Toaster />
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-600 dark:text-slate-300"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-neutral-900 dark:text-slate-50 focus:outline-none focus:border-neutral-400 dark:focus:border-slate-400 transition-colors placeholder:text-neutral-400 dark:placeholder:text-slate-400"
                placeholder="Tu nombre"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-600 dark:text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-neutral-900 dark:text-slate-50 focus:outline-none focus:border-neutral-400 dark:focus:border-slate-400 transition-colors placeholder:text-neutral-400 dark:placeholder:text-slate-400"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-600 dark:text-slate-300"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-slate-900 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              placeholder="Cuéntame qué necesitas o en qué proyecto estás pensando"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={load}
            className="mt-8 w-full sm:w-auto px-8 py-3.5 bg-neutral-900 dark:bg-slate-100 hover:bg-neutral-800 dark:hover:bg-slate-50 disabled:opacity-50 text-white dark:text-neutral-900 font-medium rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {load ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center space-y-8">
        <div>
          <p className="text-sm text-neutral-500 dark:text-slate-300 uppercase tracking-wider mb-2">
            Email
          </p>
          <p className="text-lg text-neutral-900 dark:text-slate-50">
            {showEmail ? (
              <span>luisdavidtts@outlook.com</span>
            ) : (
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="text-neutral-600 dark:text-slate-300 hover:text-neutral-800 dark:hover:text-slate-100 transition-colors"
              >
                Mostrar email
              </button>
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500 dark:text-slate-300 uppercase tracking-wider mb-2">
            Ubicación
          </p>
          <p className="text-lg text-neutral-900 dark:text-slate-50">
            La Serena, Chile
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500 dark:text-slate-300 uppercase tracking-wider mb-2">
            Disponibilidad
          </p>
          <p className="text-lg text-neutral-900 dark:text-slate-50">
            Abierto a oportunidades
          </p>
        </div>

        <div className="pt-4">
          <p className="text-neutral-600 dark:text-slate-300 leading-relaxed">
            Estoy abierto a proyectos freelance, roles remotos y colaboraciones puntuales. Cuéntame qué necesitas y te respondo en menos de 24 horas.
          </p>
        </div>
      </div>
    </div>
  );
}

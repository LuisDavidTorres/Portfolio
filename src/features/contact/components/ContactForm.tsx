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
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error);
      }
    } finally {
      setLoad(false);
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
      <div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Toaster />
          
          <div>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-0 py-4 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              placeholder="Nombre"
            />
          </div>

          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-0 py-4 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              placeholder="Email"
            />
          </div>

          <div>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-0 py-4 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-all resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              placeholder="Mensaje"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={load}
            className="mt-8 w-full sm:w-auto px-8 py-3.5 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 text-white dark:text-neutral-900 font-medium rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {load ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center space-y-8">
        <div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
            Email
          </p>
          <p className="text-lg text-neutral-900 dark:text-white">
            {showEmail ? (
              <span>luisdavidtts@outlook.com</span>
            ) : (
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              >
                Mostrar email
              </button>
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
            Ubicación
          </p>
          <p className="text-lg text-neutral-900 dark:text-white">
            La Serena, Chile
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
            Disponibilidad
          </p>
          <p className="text-lg text-neutral-900 dark:text-white">
            Abierto a oportunidades
          </p>
        </div>

        <div className="pt-4">
          <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Estoy disponible para proyectos freelance, posiciones full-time y consultorías técnicas. Respondo dentro de 24 horas.
          </p>
        </div>
      </div>
    </div>
  );
}

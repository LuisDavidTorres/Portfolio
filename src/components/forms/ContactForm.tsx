import Mail from "../icons/Mail";
import Location from "../icons/Location";
import { useState } from "react";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const response = await fetch("/api/resend", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
    } catch (error) {
      console.error("Error al realizar la consulta a la API:", error);
    }
  };

  return (
    <>
      <form className="flex flex-col lg:flex-row" onSubmit={handleSubmit}>
        <section className="flex flex-col p-5 w-full lg:w-1/2 space-y-5 bg-gray-500/10 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <p className="mb-2 font-bold text-xl lg:text-2xl">Contáctame</p>

          <div className="flex flex-col">
            <label className="mb-1 text-sm lg:text-base">Nombre</label>
            <input
              id="name"
              name="name"
              className="rounded-md p-2 dark:bg-white text-black"
              type="text"
              required
              maxLength={50}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm lg:text-base">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              className="rounded-md p-2 dark:bg-white text-black"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm lg:text-base">Mensaje</label>
            <textarea
              id="message"
              name="message"
              className="rounded-md p-2 min-h-[100px] dark:bg-white text-black"
              required
              maxLength={500}
            ></textarea>
          </div>

          <button className="bg-black/80 hover:bg-black text-white rounded-md p-2 mt-10">
            Enviar mensaje
          </button>
          {responseMessage && <p>{responseMessage}</p>}
        </section>

        <section className="p-5 w-full lg:w-1/2 space-y-5 bg-gray-500/5 rounded-b-lg lg:rounded-e-lg lg:rounded-bl-none">
          <p className="mb-2 font-bold text-xl lg:text-2xl">
            Información de contacto
          </p>
          <div className="flex items-center">
            <Mail />
            <p className="ml-1 text-sm lg:text-base mt-2">
              Luisdaviddts@outlook.com
            </p>
          </div>
          <div className="flex items-center">
            <Location />
            <p className="ml-1 text-sm lg:text-base">La Serena, Chile</p>
          </div>
        </section>
      </form>
    </>
  );
}

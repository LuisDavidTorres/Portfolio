import Mail from "../icons/Mail";
import Location from "../icons/Location";
import { useState } from "react";
import LoadButton from "../buttons/LoadButon";
import CharacterCounter from "../counters/CharacterCounter";
import toast, { Toaster } from "react-hot-toast";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [countCharacters, setCountCharacters] = useState<number>(0);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const notify = () => toast("Correo enviado");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      event.preventDefault();
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

      if (data.message) {
        setResponseMessage(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al realizar la consulta a la API:", error);
      }
    } finally {
      setLoad(false);
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <>
      <form className="flex flex-col lg:flex-row" onSubmit={handleSubmit}>
        <Toaster />
        <section className="flex flex-col p-5 w-full lg:w-1/2 space-y-5 bg-gray-custom rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <p className="mb-2 font-bold text-xl lg:text-2xl">Contáctame</p>

          <div className="flex flex-col">
            <label className="mb-1 text-sm lg:text-base">Nombre</label>
            <input
              id="name"
              name="name"
              placeholder="Francisco Rojas"
              className="rounded-md p-2 dark:bg-white text-black"
              type="text"
              required
              maxLength={50}
              min={2}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm lg:text-base">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              placeholder="Francisco@dominio.cl"
              className="rounded-md p-2 dark:bg-white text-black"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm lg:text-base">Mensaje</label>
            <section>
              <textarea
                id="message"
                name="message"
                className="rounded-md p-2 min-h-[100px] dark:bg-white text-black w-full"
                required
                maxLength={500}
                minLength={50}
                onChange={(e) => {
                  setCountCharacters(Number(e.target.textLength));
                }}
              ></textarea>
              <CharacterCounter
                characters={countCharacters}
                requiredCharacters={500}
              />
            </section>
          </div>

          <section className="mt-10">
            {!load ? (
              <button className="bg-black/70 hover:bg-black text-white rounded-md p-2 w-full">
                Enviar mensaje
              </button>
            ) : (
              <LoadButton />
            )}
          </section>
        </section>

        <section className="p-5 w-full lg:w-1/2 space-y-5 bg-gray-500/5 rounded-b-lg lg:rounded-e-lg lg:rounded-bl-none">
          <p className="mb-2 font-bold text-xl lg:text-2xl">
            Información de contacto
          </p>
          <div className="flex items-center">
            <Mail />
            {showEmail ? (
              <p className="ml-1 text-sm lg:text-base mt-2">
                Luisdavidtts@outlook.com
              </p>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowEmail(true);
                }}
                className="text-white ml-1 mt-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-0.5 text-center "
              >
                Ver Correo
              </button>
            )}
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

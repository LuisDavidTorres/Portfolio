export default function DownloadCv() {
  return (
    <span className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 font-semibold rounded-full text-base px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition ease-out duration-200">
      <a href="/pdf/CV_Luis_Salvatierra_Informatico.pdf" download={true}>Descargar CV</a>
    </span>
  );
}

import { type FC } from "react";
import HeaderHome from "../HeaderHome";

const Home: FC = () => {
  return (
    <HeaderHome>
      {}
      <section className="relative w-full h-[350px] sm:h-screen">
        <img
          src="/hospital.jpg"
          alt="Hospital Banner"
          className="w-full h-full object-cover brightness-110 contrast-105"
        />
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white font-serif px-6">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-wide leading-tight">
            Cuidamos de tu Salud
          </h2>
          <p className="mt-4 text-xl sm:text-3xl max-w-3xl leading-relaxed">
            Atención médica especializada con calidad y compromiso
          </p>
          <button className="mt-8 px-10 py-4 bg-white text-blue-900 rounded-3xl font-semibold shadow-lg hover:shadow-xl hover:bg-gray-200 transition-all duration-300 text-lg sm:text-xl">
            Agenda tu cita
          </button>
        </div>
      </section>

      {/* Sección de tarjetas */}
      <section className="container mx-auto py-20 px-6 sm:px-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 text-center font-serif">
        {/* Centros Especializados */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 hover:scale-105 transform transition duration-300">
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
            Centros Especializados
          </h3>
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">
            Contamos con áreas especializadas como cardiología, pediatría,
            neurología y oncología, con equipos médicos altamente capacitados
            para ofrecer diagnósticos y tratamientos de calidad.
          </p>
        </div>

        {/* Diagnósticos Avanzados */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 hover:scale-105 transform transition duration-300">
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
            Diagnósticos Avanzados
          </h3>
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">
            Tecnología de última generación en laboratorio clínico, imagenología
            y pruebas especializadas para obtener resultados precisos y
            confiables en el menor tiempo posible.
          </p>
        </div>

        {/* Servicios Hospitalarios */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 hover:scale-105 transform transition duration-300">
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
            Servicios Hospitalarios
          </h3>
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">
            Atención integral que incluye hospitalización, cirugía, urgencias y
            consulta externa, asegurando bienestar y confort a pacientes y
            familiares.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="bg-gray-50 py-24 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto font-serif text-gray-800 leading-relaxed text-xl sm:text-2xl">
          <h3 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-10 text-center">
            Nuestra Historia
          </h3>
          <p className="mb-6">
            Desde nuestros inicios hace más de 25 años, el Hospital Salud y Vida
            ha brindado atención médica integral con calidad y ética
            profesional. Nos hemos consolidado como un referente en la región,
            cuidando la salud de miles de pacientes y acompañando a sus familias
            con calidez y dedicación.
          </p>
          <p>
            A lo largo de los años, hemos incorporado tecnología de punta y
            programas de formación continua para nuestro personal, con el fin de
            garantizar diagnósticos precisos y tratamientos eficaces.
          </p>
        </div>
      </section>

    
      <section className="container mx-auto py-20 px-6 sm:px-12 grid gap-10 sm:grid-cols-3 font-serif">
        {/* Misión */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <img
            src="/Mision.jpg"
            alt="Misión"
            className="w-full h-56 object-cover"
          />
          <div className="p-8 text-gray-800">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Misión</h3>
            <p className="text-xl sm:text-2xl leading-relaxed mb-4">
              Brindar a nuestros pacientes servicios hospitalarios con los más altos estándares de calidad en Centroamérica, garantizando siempre:
            </p>
            <ul className="list-disc list-inside text-xl sm:text-2xl space-y-2">
              <li>La satisfacción de nuestros pacientes y nuestro personal.</li>
              <li>El desarrollo profesional y humano de nuestros colaboradores.</li>
              <li>Una relación positiva con la comunidad a la que servimos.</li>
              <li>Atención de calidad, humana y eficiente.</li>
            </ul>
          </div>
        </div>

        {/* Visión */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <img
            src="/Vision.jpg"
            alt="Visión"
            className="w-full h-56 object-cover"
          />
          <div className="p-8 text-gray-800">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Visión</h3>
            <p className="text-xl sm:text-2xl leading-relaxed">
              Ser reconocidos como un hospital líder a nivel nacional en la
              excelencia de atención médica y tecnología avanzada, promoviendo
              la salud de la comunidad y la formación continua de nuestros
              profesionales.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <img
            src="/Valores.jpg"
            alt="Valores"
            className="w-full h-56 object-cover"
          />
          <div className="p-8 text-gray-800">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Valores</h3>
            <ul className="list-disc list-inside text-xl sm:text-2xl space-y-2">
              <li>Calidad en la atención</li>
              <li>Compromiso y responsabilidad</li>
              <li>Ética profesional</li>
              <li>Respeto y empatía por el paciente</li>
              <li>Innovación y mejora continua</li>
              <li>Integridad y confiabilidad</li>
              <li>Amor por lo que hacemos</li>
              <li>Pasión por ser los mejores</li>
              <li>Buscar siempre nuevas y mejores formas de servir</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-8 px-6 text-lg sm:text-xl font-serif">
        <p>© 2025 Hospital Salud y Vida - Comprometidos con la Vida</p>
      </footer>
    </HeaderHome>
  );
};

export default Home;

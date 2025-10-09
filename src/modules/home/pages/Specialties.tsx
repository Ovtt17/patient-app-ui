import HeaderHome from "../HeaderHome";

const Specialties = () => {
  const especialidades = [
    {
      nombre: "Cardiología",
      descripcion:
        "Atención integral para el corazón y sistema circulatorio, con tecnología avanzada.",
      img: "/cardiologia.png",
      mision:
        "Proporcionar atención cardiológica de alta calidad para mejorar la salud cardiovascular de nuestros pacientes.",
      vision:
        "Ser un referente nacional en cardiología, combinando tecnología y experiencia médica.",
    },
    {
      nombre: "Pediatría",
      descripcion:
        "Cuidado especializado para bebés, niños y adolescentes con profesionales capacitados.",
      img: "/pediatria.jpg",
      mision:
        "Brindar cuidado integral y seguro a nuestros pacientes más jóvenes.",
      vision:
        "Ser reconocidos por nuestra excelencia en salud infantil y prevención de enfermedades.",
    },
    {
      nombre: "Neurología",
      descripcion:
        "Diagnóstico y tratamiento de enfermedades del sistema nervioso con expertos especializados.",
      img: "/neurologia.jpg",
      mision:
        "Ofrecer atención neurológica de vanguardia para mejorar la calidad de vida de los pacientes.",
      vision:
        "Liderar en investigación y tratamiento de enfermedades neurológicas en la región.",
    },
    {
      nombre: "Oncología",
      descripcion:
        "Atención y seguimiento de pacientes con cáncer, utilizando tratamientos modernos y personalizados.",
      img: "/oncologia.jpg",
      mision:
        "Proporcionar cuidado integral y compasivo a pacientes oncológicos.",
      vision:
        "Ser un centro de referencia en el tratamiento del cáncer con tecnología avanzada.",
    },
    {
      nombre: "Ginecología y Obstetricia",
      descripcion:
        "Salud integral para la mujer, incluyendo embarazo y planificación familiar.",
      img: "/ginecologia.png",
      mision: "Garantizar la salud femenina con atención segura y profesional.",
      vision: "Ser líderes en salud reproductiva y bienestar de la mujer.",
    },
    {
      nombre: "Traumatología",
      descripcion:
        "Tratamiento de lesiones óseas y musculares con atención especializada y tecnología avanzada.",
      img: "/traumatologia.jpg",
      mision:
        "Recuperar la movilidad y calidad de vida de los pacientes con lesiones traumáticas.",
      vision:
        "Destacar en la atención de traumatismos con innovación y excelencia médica.",
    },
    {
      nombre: "Dermatología",
      descripcion:
        "Cuidado de la piel, diagnóstico y tratamiento de enfermedades dermatológicas.",
      img: "/dermatologia.jpg",
      mision: "Proteger y mejorar la salud de la piel de nuestros pacientes.",
      vision:
        "Ser un centro de referencia en dermatología preventiva y estética.",
    },
    {
      nombre: "Oftalmología",
      descripcion:
        "Atención para la salud visual, incluyendo exámenes de vista y cirugías especializadas.",
      img: "/oftalmologia.jpg",
      mision: "Proteger y restaurar la visión de nuestros pacientes.",
      vision:
        "Convertirnos en líderes en cuidado ocular con tecnología avanzada.",
    },
    {
      nombre: "Otorrinolaringología",
      descripcion:
        "Tratamiento de problemas de oído, nariz y garganta con especialistas certificados.",
      img: "/otorrino.jpg",
      mision:
        "Ofrecer atención integral de oído, nariz y garganta con calidad y calidez.",
      vision: "Ser reconocidos por nuestra excelencia en ORL a nivel nacional.",
    },
    {
      nombre: "Psiquiatría",
      descripcion:
        "Atención de la salud mental, con tratamiento de trastornos psicológicos y emocionales.",
      img: "/psiquiatria.jpg",
      mision:
        "Proporcionar cuidado de salud mental con enfoque humano y profesional.",
      vision:
        "Ser referentes en bienestar psicológico y tratamiento de trastornos mentales.",
    },
    {
      nombre: "Endocrinología",
      descripcion:
        "Diagnóstico y tratamiento de enfermedades hormonales y metabólicas.",
      img: "/endocrinologia.jpg",
      mision:
        "Ofrecer atención especializada para regular el metabolismo y hormonas.",
      vision:
        "Ser líderes en endocrinología y educación de hábitos saludables.",
    },
    {
      nombre: "Reumatología",
      descripcion:
        "Cuidado de articulaciones y enfermedades reumáticas con atención especializada.",
      img: "/reumatologia.jpg",
      mision:
        "Mejorar la movilidad y calidad de vida de los pacientes con enfermedades reumáticas.",
      vision:
        "Ser un centro de referencia en el tratamiento de enfermedades articulares.",
    },
  ];

  return (
    <HeaderHome>
      <div className="min-h-screen bg-gray-50 py-12 px-6 font-serif">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Especialidades Médicas
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {especialidades.map((esp) => (
            <div
              key={esp.nombre}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300"
            >
              <img
                src={esp.img}
                alt={esp.nombre}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                {esp.nombre}
              </h2>
              <p className="text-gray-700 mb-2 text-xl sm:text-2xl ">{esp.descripcion}</p>
              <p className="text-gray-600 italic mb-1 text-xl sm:text-2xl">
                <strong>Misión:</strong> {esp.mision}
              </p>
              <p className="text-gray-600 italic text-xl sm:text-2xl">
                <strong>Visión:</strong> {esp.vision}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
        <footer className="bg-blue-900 text-white text-center py-8 px-6 text-lg sm:text-xl font-serif">
        <p>© 2025 Hospital Salud y Vida - Comprometidos con la Vida</p>
      </footer>
    </HeaderHome>
  );
};

export default Specialties;

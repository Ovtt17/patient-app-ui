import HeaderHome from "../HeaderHome";


const HospitalServices = () => {
  const servicios = [
    {
      nombre: "Emergencias",
      descripcion: `
        Atención urgente las 24 horas, con especialistas en medicina de emergencia
        y enfermería altamente capacitada. Disponemos de áreas especializadas como
        Triage, Trauma y Choque, Ginecología y Observación. Contamos con equipos
        avanzados, ambulancia equipada y cobertura integral de múltiples
        especialidades médicas.`,
      img: "/emergencia.png",
    },
    {
      nombre: "Hospitalización",
      descripcion: `
        Habitaciones privadas, semi privadas y suites, con atención integral de
        enfermería, manejo del dolor y protocolos de prevención de caídas e
        infecciones. Ofrecemos un entorno seguro para la recuperación de los
        pacientes, con horarios de visita amplios y acompañamiento familiar.`,
      img: "/hospitalizacion.jpg",
    },
    {
      nombre: "Sala de Operaciones",
      descripcion: `
        Quirófanos modernos con sistemas avanzados de filtración y control de aire.
        Se realizan cirugías generales, plásticas, gineco-obstétricas,
        ortopédicas, neurológicas y urológicas, tanto hospitalarias como
        ambulatorias. Estamos a la vanguardia en cirugía mínimamente invasiva.`,
      img: "/quirofano.jpg",
    },
    {
      nombre: "Unidad de Cuidados Intensivos (UCI)",
      descripcion: `
        Unidad especializada para pacientes críticos, equipada con 15 camas,
        sistemas avanzados de filtración de aire y monitoreo continuo. Contamos con
        un equipo multidisciplinario de médicos intensivistas y enfermeras
        especializadas en paciente crítico, garantizando atención de alta calidad
        en situaciones complejas.`,
      img: "/uci.jpg",
    },
  ];

  return (
    <HeaderHome>
      <div className="min-h-screen bg-gray-50 py-12 px-6 font-serif">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Servicios Hospitalarios
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {servicios.map((servicio) => (
            <div
              key={servicio.nombre}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300"
            >
              <img
                src={servicio.img}
                alt={servicio.nombre}
                className="w-full h-72 object-cover rounded-xl mb-4"
              />
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                {servicio.nombre}
              </h2>
              <p className="text-gray-700 text-2xl">{servicio.descripcion}</p>
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

export default HospitalServices;

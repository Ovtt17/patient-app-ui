import HeaderHome from "../HeaderHome";

const Diagnosticcenters = () => {
  const centros = [
    {
      nombre: "Imagenología",
      descripcion:
        "Realizamos estudios de rayos X, ultrasonido, resonancia magnética y tomografía computarizada con tecnología de punta.",
      img: "/imagenologia.jpg",
      servicios: [
        "Angiotomografía coronaria",
        "Densitometría Ósea",
        "Mamografía",
        "Rayos X Digitalizados",
        "Tomografía",
        "Resonancia Magnética",
        "Ultrasonido",
        "Fluoroscopia",
      ],
    },
    {
      nombre: "Laboratorio de Diagnóstico Clínico",
      descripcion:
        "Análisis clínicos de sangre, orina y otros fluidos, con resultados rápidos y confiables.",
      img: "/laboratorio.jpg",
      servicios: [
        "Hemograma",
        "Glucosa",
        "Hemoglobina glicosilada (a1c)",
        "Perfil lipídico (colesterol ldl, hdl, triglicéridos)",
        "Urea y aclaramiento de creatinina",
        "Pruebas de función hepática (ast/tgo, alt/tgp, albúmina)",
        "Tsh (hormona estimulante de la tiroides)",
        "Tiempo de protrombina (tp) / inr",
        "Hcg cualitativa (prueba de embarazo)",,
        "Psa (antígeno prostático específico)"
      ],
    },
    {
      nombre: "Patología",
      descripcion:
        "Estudios histopatológicos y citológicos para detección y seguimiento de enfermedades.",
      img: "/patologia.jpg",
      servicios: [
        "Patología quirúrgica",
        "Biopsias intraoperatorias",
        "Inmunohistoquímica",
        "Citología ginecológica",
        "Citología base líquida, método SurePath",
        "Citología convencional",
        "Citología no ginecológica y de líquidos corporales",
        "Citología por punción aspiración con aguja fina",
      ],
    },
  ];

  return (
   <HeaderHome>
    <div className="min-h-screen bg-gray-50 py-12 px-6" style={{ fontFamily: "'Times New Roman', serif" }}>
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
        Centros Diagnósticos
      </h1>

      <div className="container mx-auto grid md:grid-cols-3 gap-8">
    {centros.map((centro) => (
      <div
        key={centro.nombre}
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300"
      >
        <img
          src={centro.img}
          alt={centro.nombre}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          {centro.nombre}
        </h2>
        <p className="text-2xl text-gray-700 mb-2">{centro.descripcion}</p>

        {centro.servicios.length > 0 && (
          <div>
            <h3 className="font-semibold text-blue-800 mb-1 text-xl">Servicios:</h3>
            <ul className="list-disc list-inside text-2xl text-gray-600">
              {centro.servicios.map((servicio) => (
                <li key={servicio}>{servicio}</li>
              ))}
            </ul>
          </div>
        )}
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

export default Diagnosticcenters;

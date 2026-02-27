const timeline = [
    { year: "2015", text: "Início da jornada, com o sonho de transformar o autocuidado em estilo de vida." },
    { year: "2018", text: "Expansão da linha profissional para salões e clínicas." },
    { year: "2021", text: "Tecnologia e inovação em fórmulas exclusivas." },
    { year: "2024", text: "B-Cosmetic: referência nacional em beleza consciente." },
  ];
  
  export default function Timeline() {
    return (
      <section className="relative bg-[#10061C] text-white py-20">
        <h2 className="text-center text-3xl font-bold mb-10">Nossa Jornada</h2>
        <div className="max-w-4xl mx-auto relative">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-start gap-4 mb-10">
              <div className="w-10 text-right font-bold text-purple-400">{item.year}</div>
              <div className="flex-1 border-l-2 border-purple-500 pl-6 text-purple-100">{item.text}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
